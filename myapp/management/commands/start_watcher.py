from django.core.management.base import BaseCommand
import pywatchman
import os

class Command(BaseCommand):
    help = 'Starts the directory watcher using pywatchman'

    def handle(self, *args, **options):
        def callback(changes):
            print("Files changed:", changes)

        client = pywatchman.client()
        client.query('watch', os.getcwd())
        client.query('subscribe', os.getcwd(), 'my_subscription', {'fields': ['name']}, callback)

        self.stdout.write(self.style.SUCCESS('Successfully started directory watcher with pywatchman'))
