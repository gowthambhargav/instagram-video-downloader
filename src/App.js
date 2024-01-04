import { useState } from "react";

function App() {
  const [inputUrl, setinputUrl] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handelClick = async () => {
    setLoading(true);
    setResult(null);
    if (!inputUrl) {
      alert("Please enter a valid URL");
      setLoading(false);
      return;
    }

    const url = `https://instagram-post-and-reels-downloader.p.rapidapi.com/insta/?url=${inputUrl}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "479ce4223amshafee6bbf767978cp15af79jsn9da17a02fe1d",
        "X-RapidAPI-Host": "instagram-post-and-reels-downloader.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
      if (result.detail.data.items[0].urls[0].extension === "heic") {
        alert("No video found");
        setLoading(false);
        setinputUrl("");
        return;
      }
      setResult([
        result.detail.data.items[0].pictureUrl,
        result.detail.data.items[0].urls[0].urlDownloadable,
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      // console.error(error);
    }
    setinputUrl("");
  };
  return (
    <div className="App bg-white/85 h-[100vh] lg:h-[100vh]">
      <section className="w-full">
        <h1 className="text-black font-bold text-center sm:text-2xl lg:text-4xl p-2">
          Download Instagram Videos
        </h1>
        <p className="text-black font-bold text-center p-2">
          Enter the URL of the video you want to download
        </p>
        <p className="text-center">
          <a
            href="https://github.com/gowthambhargav"
            target="_blank"
            className="text-black font-bold text-center p-2"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/gowtham-bhargav-6a64a5218"
            target="_blank"
            className="text-black font-bold text-center p-2"
          >
            Linkedin
          </a>
        </p>
      </section>
      <p className="text-black font-bold text-center p-2">Version 1.0.0</p>
      <p className="text-white text-center p-2"></p>
      <section className="bg-slate-300 w-full h-full flex flex-wrap justify-center p-2">
        <div className="w-1/3 flex justify-center h-fit mt-3">
          <input
            value={inputUrl}
            onChange={(e) => {
              setinputUrl(e.target.value);
            }}
            className="rounded-md outline-none p-2 lg:w-[18rem]   border-2 border-blue-700"
            type="text"
            name="url"
            id="url"
            placeholder="Enter URL"
          />
          <button
            onClick={handelClick}
            className="bg-blue-500 p-2 text-xl font-bold rounded-md ml-2"
          >
            Submit
          </button>
        </div>
        <section className=" container mt-5 p-5">
          {loading ? (
            <div className="text-center  flex justify-center">
              <img
                src="loading.gif"
                className="w-[60px]"
                alt="loding"
                srcset="spinner.gif"
              />
            </div>
          ) : (
            result && (
              <div className="flex flex-col items-center mt-2 w-full justify-center">
                <div className="">
                  <img
                    className="lg:w-[160px] lg:h-[190xp]"
                    src={result[0]}
                    alt=""
                    srcset={result[0]}
                  />
                </div>
                <div className="m-2">
                  <button
                    onClick={() => {
                      window.open(result[1], "_blank");
                    }}
                    type="button"
                    value="Download"
                    name="Download"
                    id="Download"
                    title="Download"
                    aria-label="Download"
                    role="button"
                    tabIndex="0"
                    data-testid="Download"
                    data-test-id="Download"
                    data-test="Download"
                    data-test-class="Download"
                    data-test-class-name="Download"
                    data-test-class-names="Download"
                    className=" rounded-md
                bg-blue-500 p-2 text-xl font-bold ml-2
                hover:bg-blue-700
                active:bg-blue-800
                focus:outline-none focus:ring focus:ring-blue-300
                transition-all duration-300 ease-in-out
                transform hover:-translate-y-1 hover:scale-110
                active:scale-100 active:translate-y-0
                focus:scale-100 focus:translate-y-0
                focus:ring-opacity-50
                focus:ring-offset-0
                focus:ring-offset-white
                focus:ring-offset-opacity-0
                focus:ring-offset-shadow-none
                focus:ring-shadow-none
                focus:ring-shadow-opacity-0
                focus:ring-shadow-offset-0
                focus:ring-shadow-offset-white
                focus:ring-shadow-offset-opacity-0
                focus:ring-shadow-offset-shadow-none
                focus:ring-shadow-offset-shadow-opacity-0
                focus:ring-shadow-offset-shadow-offset-0
                focus:ring-shadow-offset-shadow-offset-white
                focus:ring-shadow-offset-shadow-offset-opacity-0
                focus:ring-shadow-offset-shadow-offset-shadow-none
                focus:ring-shadow-offset-shadow-offset-shadow-opacity-0
                focus:ring-shadow-offset-shadow-offset-shadow-offset-0
                focus:ring-shadow-offset-shadow-offset-shadow-offset-white
                focus:ring-shadow-offset-shadow-offset-shadow-offset-opacity-0
                focus:ring-shadow-offset-shadow-offset-shadow-offset-shadow-none
                m-3
                "
                  >
                    Download
                  </button>
                </div>
              </div>
            )
          )}
        </section>
      </section>
    </div>
  );
}

export default App;
