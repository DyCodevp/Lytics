///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = import.meta.env.VITE_PATVALUE;
// Specify the correct user_id/app_id pairings

// Since you're making inferences outside your app's scope
const USER_ID = "salesforce";
const APP_ID = "blip";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "general-english-image-caption-blip";
const MODEL_VERSION_ID = "cdb690f13e62470ea6723642044f95e4";

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////
export function BadConfig_text(error) {
  return { error: `Bad Configuration: ${error}`, Value: error ? true : false };
}
export async function run_text(IMAGE_URL = "#") {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
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

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  const resultData = await fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => error);
  return resultData;
}
