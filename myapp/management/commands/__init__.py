# myapp/management/commands/__init__.py

# Import your custom management command
from .start_watcher import Command as StartWatcherCommand

# Register the command
commands = {
    'start_watcher': StartWatcherCommand,
}
