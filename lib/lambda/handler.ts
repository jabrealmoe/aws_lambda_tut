
export async function handler(event: string, context: string) {
  console.log('Stage name is: ' + process.env.stage);
  return {
    body: 'hello from a lambda Function',
    statusCode: 200,
  };
}
