from flask import Flask, jsonify, request, render_template
import requests
import openai
import json

# app = Flask(__name__)
app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

with open('courses_with_profs.json') as f:
    data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

# Set up OpenAI API credentials
openai.api_key = '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'

@app.route('/process_form', methods=['POST'])
def process_form():
    # get the form data from the request
    data = requests.form
    
    # extract the relevant data from the form
    input_text = data['input_text']
    
    # call the OpenAI API
    response = requests.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
        },
        json={
            'prompt': input_text,
            'max_tokens': 100,
        }
    )
    
    # extract the generated text from the API response
    generated_text = response.json()['choices'][0]['text']
    
    # return the generated text as a response to the frontend
    return generated_text

@app.route('/generate', methods=['POST', 'GET'])
def generate_response():
    # Get prompt from request data
    # prompt = request.json['prompt']

    prompt = """
        Give me a semester vise course schedule of what courses i should take per semester. Choose 1 professor for each course based on rating.
        I have total 8 semesters and maximum 2 courses per semester
        give me the output in the following json format
        {
            [semester_number]:[
                {'name': [course_name], 'prof', [prof_name], 'units': [units]}, ....
            ]
        }
        the following is the input json description for my courses. 
        Also make sure to give an explaination after the json response as to why you chose the particular schedule
        keep this information in mind while generating the
        course scheule
    """

    if request.method == 'POST':
        data = request.get_json()
        app.logger.info("frontend data")
        app.logger.info(data)
        app.logger.info(data['quarters'])
        prompt = f"""
            Give me a semester vise course schedule of what courses i should take per semester.
            I have total {data['quarters']} semesters and maximum {data['units']} units per semester
            give me the output in the following json format
            Answer: {{"quarter [semester_number]":[{{"name": [course_name], "prof", [prof_name], "units": [units]}}, ....]}}
            Choose one professor per course in the above format based on data provided ahead.
            the following is the input json description for my courses. I want the schedule to be {data['difficulty']}
            Also make sure to give an explaination after the json response as to why you chose the particular schedule keep this information in mind while generating the course scheule
        """
    
    
    prompt += json.dumps(data)

    # Call OpenAI API to generate response
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        max_tokens=700
    )
    
    response_string = response.choices[0].text

    app.logger.info(response_string)

    if "Answer:" in response_string:
        answer_string = response_string[response_string.index("Answer:") + len("Answer:"):]
    else:
        answer_string = response_string

    original_string = answer_string
    start_pos = original_string.find("{") + 1
    end_pos = original_string.rfind("}")
    extracted_data = "{"+original_string[start_pos:end_pos]+"}"

    app.logger.info(extracted_data)

    python_obj = json.loads(extracted_data)

    explain_string = answer_string[answer_string.index("Explanation:") + len("Explanation:"):]

    response_dict= {
        'courses':python_obj,
        'explaination': explain_string
    }

    app.logger.info(response_dict)

    # Return response as JSON
    # app.logger.info(response.choices[0].text)
    return jsonify(response_dict)

if __name__ == '__main__':
    app.run(debug=True)