from flask import Flask, jsonify, request, render_template
import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# app = Flask(__name__)
app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

with open('courses_with_profs.json') as f:
    course_data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

# Set up OpenAI API credentials
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate', methods=['POST', 'GET'])
def generate_response():
    # Get prompt from request data
    # prompt = request.json['prompt']

    prompt = """
        Give me a semester wise course schedule of what courses i should take per semester. Choose 1 professor for each course based on rating.
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
            Give me a quarter wise course schedule of what courses I should take per quarter.
            I have total {data['quarters']} quarters and maximum {data['units']} courses per quarters.
            give me the output in the following json format:
            Answer: {{"quarter [semester_number]":[{{"name": [course_code], "prof", [prof_name], "units": [units]}}]}}
            Choose one professor per course in the above format based on data provided ahead. 
            Do not schedule a prerequisite class after a high level class. (For example, CS 180 must precede CS181).
            the following is the input json description for my courses. I want the schedule to be {data['difficulty']}
            Also make sure to give an in-depth explanation after the json response as to why you chose the particular schedule keep this information in mind while generating the course scheule. Make sure your generated schedule has only values from data below
        """
    
    
    prompt += json.dumps(course_data)

    app.logger.info(prompt)

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
    return jsonify(response_dict)

if __name__ == '__main__':
    app.run(debug=True)