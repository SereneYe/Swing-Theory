# import openai
openai_api_key = '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'
#
# client = openai.OpenAI(api_key=openai_api_key)
#
# def get_prompt(score, comment):
#     prompt = (f'suppose you are a tennis coach, given a score = {score} out of 100, and the comment {comment}. '
#               f'Write an encouraging instruction with no more than 100 words to the player or his single swing')
#     return prompt
#
# def get_ai_response(score, comment):
#     response = client.chat.completions.create(
#         messages=[
#             {
#                 "role": "tennis coach",
#                 "content": get_prompt(80, "lower your hands"),
#             }
#         ],
#         model="gpt-4",
#     )
#     return response
#
# def test_get_ai_response():
#     print(get_ai_response(80, 'lower your left shoulder'))

from openai import OpenAI
client = OpenAI(api_key=openai_api_key)

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)