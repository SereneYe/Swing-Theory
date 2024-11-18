from openai import OpenAI

openai_api_key = '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'
client = OpenAI(api_key=openai_api_key)


def get_prompt(score, comment):
  prompt = (f'suppose you are a tennis coach, given a score = {score} out of 100, and the comment {comment}. '
            f'Write an encouraging instruction with no more than 30 words to the player or his single swing')
  return prompt



completion = client.chat.completions.create(
  model="gpt-4o",
  messages=[{ 'role': 'system', 'content': get_prompt(99, 'lower head') }]
)

print(completion.choices[0].message.content)