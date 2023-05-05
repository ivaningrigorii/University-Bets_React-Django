import random
from time import sleep

from celery import shared_task
import datetime as dt

from apps.bets.models import Bet
from apps.games.models import Game, Gamer
from apps.user_profiles.models import Profile


class GameIniter:

    def bets_sum(self, bets):
        result = 0
        for b in bets:
            result+=bets.money
        return result

    def make_wins(self, game):
        gamers = Gamer.objects.filter(game=game)
        if len(gamers) == 2:
            first = random.randint(0, 1)

            gamers[0].win(bool(first))
            gamers[1].win(True) if bool(first) == False else True

            for g in gamers:
                g.save()

            bets = Bet.objects.filter(gamer__in=gamers)
            rsum = self.bets_sum(bets)

            for b in bets:
                up = Profile.objects.get(pk=b.user.pk)
                up.money = up + (rsum/b.money) * rsum if (b.gamer.win == True) else up - b.money
                up.save()

    @shared_task
    def initg(self, ):
        games = Game.objects.filter(gameinit=False)
        for g in games:
            if g.date_game < dt.datetime.now():
                self.make_wins(g)
                g.gameinit = True
                g.save()
        sleep(30)

    @shared_task
    def null_wins(self):
        nbets = Bet.objects.filter(gamer=None)
        for nb in nbets:
            up = Profile.objects.get(pk=nb.user.pk)
            up.money = up + nb.money
            nb.delete()
            up.save()



