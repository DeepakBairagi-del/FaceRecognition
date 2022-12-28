import json
import boto3
from botocore.exceptions import ClientError

def handler(event, context):
    region = "ap-south-1"
    data = json.loads(event.get('body') or '{}')
    client=boto3.client('rekognition' , region_name = region)
    try:
        data = client.delete_collection(CollectionId=data['collectionName'])
        result = "Collection deleted successfully"
    except client.exceptions.ResourceNotFoundException:
        result = "Collection not found"
    except ClientError as e:
        result = "Can not delete"
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }
