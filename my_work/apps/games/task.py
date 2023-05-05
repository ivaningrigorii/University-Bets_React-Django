import random

import pytz
from celery import shared_task
import datetime as dt

from pytz import UTC

from apps.bets.models import Bet
from apps.games.models import Game, Gamer
from apps.user_profiles.models import Profile


def bets_sum(bets):
    result = 0
    for b in bets:
        result+=bets.money
    return result


def make_wins(game):
    gamers = Gamer.objects.filter(game=game)
    if len(gamers) == 2:
        first = random.randint(0, 1)

        gamers[0].win(bool(first))
        gamers[1].win(True) if bool(first) == False else True

        for g in gamers:
            g.save()

        bets = Bet.objects.filter(gamer__in=gamers)
        rsum = bets_sum(bets)

        for b in bets:
            up = Profile.objects.get(pk=b.user.pk)
            up.money = up + (rsum/b.money) * rsum if (b.gamer.win == True) else up - b.money
            up.save()


@shared_task()
def initg():
    try:
        utc = pytz.UTC
        games = Game.objects.filter(gameinit=False)
        for g in games:
            if g.date_game.replace(tzinfo=utc) < dt.datetime.now():
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
        nbets = Bet.objects.filter(gamer=None)
        for nb in nbets:
            up = Profile.objects.get(pk=nb.user.pk)
            up.money = up.money + nb.money
            nb.delete()
            up.save()
        return True
    except Exception as e:
        print(e)
        return False

