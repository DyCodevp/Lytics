/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the prompt text we want
// to provide as an input. Change these strings to run your own example.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
// To use a hosted text file, assign the URL variable
// const TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt'

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////
const PAT = import.meta.env.VITE_PATVALUE;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
// Change these to whatever model and text you want to use
export default async function run_generate(
  RAW_TEXT = "A penguin watching the sunset"
) {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the prompt text we want
  // to provide as an input. Change these strings to run your own example.
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "segmind";
  const APP_ID = "segmind-stable-diffusion";
  // Change these to whatever model and text you want to use
  const MODEL_ID = "ssd-1b";
  const MODEL_VERSION_ID = "5cc1a784916a402eac8b8f51391ed15b";

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          text: {
            raw: RAW_TEXT,
            // "url": TEXT_FILE_URL
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  const response = await fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const imageBase64 = result.outputs[0].data.image.base64;
      return imageBase64;

      // Create an anchor element for downloading the image
    })
    .catch((error) => console.log("error", error));
  return response;
}
