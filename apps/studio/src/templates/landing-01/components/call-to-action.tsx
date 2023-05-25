import { Editable } from "@/components/editable";

export function CallToAction() {
  return (
    <section className="container mx-auto text-center py-6 mb-12">
      <div className="w-full text-center">
        <Editable title="Call to Action Title" id="call-to-action.title">
          <h1 className="my-2 text-5xl font-bold leading-tight text-white">
            Call to Action
          </h1>
        </Editable>
      </div>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <Editable title="Call to Action Description" id="call-to-action.description">
      <h3 className="my-4 text-3xl leading-tight">
        Main Hero Message to sell yourself!
      </h3>
      </Editable>
      <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        Action!
      </button>
    </section>
  )
}