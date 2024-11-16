import firebase_admin
from firebase_admin import credentials, storage
import os
import models.response as Response
import errors.errors as Errors

# Get the directory where the script is located
current_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(current_dir)

# Initialize the Firebase app with your credentials
cred_path = os.path.join(base_dir, 'config/firebase_cred.json')
# print(cred_path)
cred = credentials.Certificate(cred_path)


firebase_admin.initialize_app(cred, {
    'storageBucket': 'tennisstrokeprocess-2ca16.appspot.com'
})

# Get a reference to the storage bucket
bucket = storage.bucket()

def upload_file_to_firebase(local_file_path, cloud_file_path):
    """
    Uploads a file to Firebase Cloud Storage.

    :param local_file_path: The path to the local file to be uploaded.
    :param cloud_file_path: The path where the file will be stored in the cloud.
    """
    try:
        blob = bucket.blob(cloud_file_path)

        # local_file_path = os.path.join(base_dir, local_file_path)
        blob.upload_from_filename(local_file_path)

        # Make the file publicly accessible
        blob.make_public()

        # Get the public URL
        file_url = blob.public_url

        # print(f'File uploaded to {cloud_file_path}.')
        # print(f'Public URL: {blob.public_url}')
        return Response.success(file_url)
    except :
        return Response.failure(Errors.UPLOAD_FAILURE_ERROR)
