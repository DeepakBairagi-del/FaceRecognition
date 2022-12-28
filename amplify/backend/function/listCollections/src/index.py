import json
import boto3
from botocore.exceptions import ClientError

def handler(event, context):
    region = "ap-south-1"
    client=boto3.client('rekognition', region_name = region)
    try:
        response = client.list_collections()
        result = response['CollectionIds']
        count = len(result)
    except ClientError as e:
        result ="Problem in client"
        count = 0
        
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'result' : result, 'count': count}),
    }