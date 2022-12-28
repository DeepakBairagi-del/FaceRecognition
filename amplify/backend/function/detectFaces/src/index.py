import json
import boto3

def handler(event, context):
    region = "ap-south-1"
    bucket = "imagesstore65739-staging"
    data = json.loads(event.get('body') or '{}') 
    client=boto3.client('rekognition', region_name = region)
    key = "public/"+data['photo']
  
    response = client.detect_faces(Image={"S3Object":{"Bucket" : bucket , "Name" : key}},Attributes=['ALL'])
    bounding_boxes = []
    for details in response['FaceDetails']:
        bounding_boxes.append(details['BoundingBox'])

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }, 
        'body': json.dumps(bounding_boxes)
    }