import { Editable } from "@/components/editable";

export function Features() {
  return (
    <section className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <Editable title="Feature Section Title" id="feature.title">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Title
        </h1>
        </Editable>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <Editable title="Feature 1 Title" id="feature.1.title">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Lorem ipsum dolor sit amet
              </h3>
            </Editable>
            <Editable title="Feature 1 Title" id="feature.1.text">
              <p className="text-gray-600 mb-8">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                <br />
                <br />

                Images from:

                <a className="text-pink-500 underline" href="https://undraw.co/">undraw.co</a>
              </p>
            </Editable>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <Editable title="Feature 1 Image" id="feature.1.image">
              <img src="/feature-1.png" alt="" />
            </Editable>
          </div>
        </div>
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <Editable title="Feature 2 Image" id="feature.2.image">
              <img src="/feature-2.png" alt="" className="w-full h-full" />
            </Editable>
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="align-middle">
              <Editable title="Feature 2 Title" id="feature.2.title">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Lorem ipsum dolor sit amet
                </h3>
              </Editable>
              <Editable title="Feature 2 Text" id="feature.2.text">
              <p className="text-gray-600 mb-8">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                <br />
                <br />
                Images from:

                <a className="text-pink-500 underline" href="https://undraw.co/">undraw.co</a>
              </p>
              </Editable>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}