import { Editable } from "@/components/editable";

export function Hero () {
  return (
    <div className="py-32">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <Editable title="Hero Message" id="hero.message">
            <p className="outline-0 uppercase tracking-loose w-full mb-4">What business are you?</p>
          </Editable>
          <Editable title="Hero Title" id="hero.title">
            <h1 className="outline-0 text-5xl font-bold leading-tight mb-8">
              Main Hero Message to sell yourself!
            </h1>
          </Editable>

          <Editable title="Hero description" id="hero.description">
            <p className="outline-0 leading-normal text-2xl mb-8">
              Sub-hero message, not too long and not too short. Make it just right!
            </p>
          </Editable>
        </div>
        <div className="w-full md:w-3/5 pl-64 text-right">
          <Editable title="Hero Image" id="hero.image">
            <img className="w-full z-50" src="/hero.png" />
          </Editable>
        </div>
      </div>
    </div>
  )
}