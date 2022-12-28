import json
import boto3
from botocore.exceptions import ClientError

def handler(event, context):
    data = json.loads(event.get('body') or '{}')
    region = "ap-south-1"
    bucket = "imagesstore65739-staging"
    key = "public/"+data['photo']+".jpg" 
    client=boto3.client('rekognition' , region_name = region)
    
    # s3  = boto3.client('s3', region_name=region)
    # fileObj = s3.get_object(Bucket = bucket, Key = key)
    # fileContent = fileObj['Body'].read()
    # image = {"Bytes": fileContent}

    try:
        response=client.index_faces(CollectionId= data['collectionName'],Image={"S3Object":{"Bucket" : bucket , "Name" : key}},ExternalImageId=data['photo'],QualityFilter="AUTO", DetectionAttributes=['ALL'])
        faces = response['FaceRecords']
        if len(faces) == 0:
            result = "No faces found"
        else:
            result = "Succefully Registered face"
    except ClientError as e :
        result = "Dont give space in person's name"
  
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }