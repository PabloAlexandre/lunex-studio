'use client';

import { Editable, Group } from "@/components/editable";
import { ListEditorWithTitle } from "@/components/list-editor/list-editor-with-title";

const defaultProps = {
  title: 'Footer Link',
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
  }]
}

const LinkGroupEditor = ({ id, title }: any) => {
  return (
    <Group id={id} title={title} props={{
      defaultProps,
      EditableComponent: ListEditorWithTitle,
    }}>
      {
        ({
          title = 'No Title',
          items
        }) => (
          <div className="px-2">
            <p className="uppercase text-gray-500 md:mb-6">{title}</p>

            <ul className="list-reset mb-6">
              {
                items.map((item: any) => (
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0" key={item.text}>
                    <a href={item.href} className="no-underline hover:underline text-gray-800 hover:text-pink-500">{item.text}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        )}
    </Group>
  )
}

export function Footer() {
  return (
    <>
      <footer className="bg-white">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 mr-8 text-black">
              <Editable id="footer.logo" title="Footer Logo">
                <img src="/footer-logo.png" alt="" />
              </Editable>
            </div>
            <div className="flex-1 w-full h-full">
              <LinkGroupEditor id="footer.links" title="Footer Links" />
            </div>
            <div className="flex-1 w-full h-full">
              <LinkGroupEditor id="footer.legal" title="Footer Legal" />
            </div>
            <div className="flex-1 w-full h-full">
              <LinkGroupEditor id="footer.social" title="Footer Social" />
            </div>
            <div className="flex-1 w-full h-full">
              <LinkGroupEditor id="footer.company" title="Footer Company" />
            </div>
          </div>
        </div>
      </footer>

      <div>
        <Editable title="Footer Copyright" id="footer.copyright">
          <p className="text-center p-3">Distributed By: <a href="https://themewagon.com/">Themewagon</a></p>
        </Editable>
      </div>
    </>
  )
}