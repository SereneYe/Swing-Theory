SUCCESS_CODE = '200'


def success(message):
    return Response(message, True)


def failure(message):
    return Response(message, False)


class Response:

    def __init__(self, message, success: bool):
        self.message = message
        self.success = success

    def to_dict(self):
        """Serialize the model instance to a dictionary."""
        return {
            'message': self.message,
            'success': self.success
        }

    def __str__(self):
        return f'message = [{self.message}] \n' \
               f'success = {self.success}'