import random

import pytz
from celery import shared_task
import datetime as dt

from pytz import UTC

from apps.bets.models import Bet
from apps.games.models import Game, Gamer
from apps.user_profiles.models import Profile
from apps.teams.models import TeamModel
from apps.user_profiles.models import HistoryGameInit
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model


def bets_sum(bets):
    result = 0
    for b in bets:
        result += b.money
    return result


def make_wins(game):
    gamers = Gamer.objects.filter(game=game)
    if len(gamers) == 3:
        non_index = 0
        count_index = 0
        gamers_power = []
        sum_power = 0

        for g in gamers:
            team = TeamModel.objects.get(pk = g.team.id)
            if (team.name != "ничья"):
                local_sum_power = 0
                local_sum_power += team.o_power
                local_sum_power += team.o_fortitude
                local_sum_power += team.o_endurance
                sum_power += local_sum_power
                gamers_power.append(local_sum_power)
            else:
                non_index = count_index
                gamers_power.append(0)
            count_index += 1

        for i in range(3):
            if (i != non_index):
                gamers_power[i] = (gamers_power[i] / sum_power) * 100 * 0.7
            else:
                gamers_power[i] = 30

        win_gamer_index = -1
        random_win = random.randint(1, 100)

        if (random_win <= gamers_power[0]):
            win_gamer_index = 0
        elif (random_win > gamers_power[0] and random_win <= gamers_power[1]):
            win_gamer_index = 1
        else:
            win_gamer_index = 2

        for i in range(3):
            if i == win_gamer_index:
                gamers[i].win = True
            else:
                gamers[i].win = False

        for g in gamers:
            g.save()

        bets = Bet.objects.filter(gamer__in=gamers)
        rsum = bets_sum(bets)

        for b in bets:
            up = Profile.objects.get(pk=b.user.pk)
            win_money = -1
            if (b.gamer.win == True):
                win_money = (rsum / b.money) * rsum
            else: 
                win_money = (-1) * b.money
            print(win_money)
            up.money = up.money + win_money
            
            b.bet_init = True
            b.save()
            up.save()


            hist = HistoryGameInit()
            hist.user = get_user_model().objects.get(pk = b.user.pk) 
            hist.date_game = game.date_game
            hist.team_name = b.gamer.team.name
            hist.bet_money = b.money
            hist.win_money = win_money
            if b.gamer.win == True:
                hist.result = True
            else:
                hist.result = False
            hist.save()


@shared_task()
def initg():
    try:
        utc = pytz.UTC
        games = Game.objects.filter(gameinit=False)
        for g in games:
            dt_now = dt.datetime.now().replace(tzinfo=pytz.utc)
            dt_game = g.date_game.replace(tzinfo=pytz.utc) + timedelta(minutes=180)
            print(dt_now)
            print(dt_game)
            if dt_game < dt_now:
                print('Начало инициализации игры')
                make_wins(g)
                g.gameinit = True
                g.save()
        return True
    except Exception as e:
        print(e)
        return False


@shared_task()
def null_wins():
    try:
        nbets = Bet.objects.filter(gamer=None, bet_init=False)
        for nb in nbets:
            up = Profile.objects.get(pk=nb.user.pk)
            up.money = up.money + nb.money
            nb.bet_init = True
            nb.save()
            up.save()
        return True
    except Exception as e:
        print(e)
        return False
