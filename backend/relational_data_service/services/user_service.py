from flask import jsonify
from sqlalchemy import and_
from models.user import User
import models.response as Response
import errors.errors as Errors


def add_user(db, user_id):
    user = User(user_id=user_id, left_handed=left_handed)
    try:
        db_user = User.query.filter_by(user_id=user_id).first()
        if db_user is not None:

            return Response.success(f'user {user_id} already exists')
        db.session.commit()
        return Response.success('successfully inserted into record')
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return Response.failure(f'failed to insert into raw_videos because {e}')
    finally:
        db.session.close()  # Close the session

def update_user(db, user_id, left_handed):
    user = User(user_id=user_id, left_handed=left_handed)
    try:
        db_user = User.query.filter_by(user_id=user_id).first()
        if db_user is None:
            db.session.add(user)
        else:
            db_user.left_handed = left_handed
        db.session.commit()
        return Response.success('successfully inserted into user')
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return Response.failure(f'failed to insert into raw_videos because {e}')
    finally:
        db.session.close()  # Close the session
