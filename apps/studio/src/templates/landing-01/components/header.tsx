'use client';
import { Editable, Group } from "@/components/editable";
import { useGroupEditable } from "@/components/editable/group-editable";
import { ListEditor } from "@/components/list-editor/list-editor";

const defaultProps = {
  items: [{
    text: 'Active',
    href: '#'
  }, {
    text: 'link',
    href: '#'
  }, {
    text: 'link',
    href: '#'
  }, {
    text: 'Action',
    href: '#',
    rounded: true,
  }]
}

const HeaderLinks = () => (
  <Group id="header.links" title="Header Links" fixed props={{
    defaultProps,
    EditableComponent: ListEditor,
  }}>
    {
      ({
        items
      }) => {
        const links = items.filter((item: any) => !item.rounded) || [];
        const actions = items.filter((item: any) => item.rounded === true) || [];

        return (
          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              {
                links.map((item: any) => (
                  <li className="mr-3" key={item.link}>
                    <a className="inline-block py-2 px-4 text-black no-underline" href={item.link}>{item.text}</a>
                  </li>
                ))
              }
            </ul>
            {
              actions.map((item: any) => (
                <button
                  id="navAction"
                  key={item.link}
                  className=" mr-2 flex  hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  {item.text}
                </button>
              ))
            }
          </div>
        )
      }
    }
  </Group>
);

export function Header() {
  return (
    <nav id="header" className="fixed flex w-full z-20 top-0 text-white" style={{ background: 'white' }}>
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Editable
            title="Logo"
            id="header.logo"
            fixed
          >
            <img src="/logo.webp" style={{ width: 72 }} alt="Logo" className="flex" />
          </Editable>
        </div>
        <div className="block lg:hidden pr-4">
          <button id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <HeaderLinks />
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  )
}