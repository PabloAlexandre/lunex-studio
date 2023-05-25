import { CompositeDecorator } from "draft-js";

const Link = ({ entityKey, contentState, children }: any) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a 
      style={{ color: "blue", fontStyle: "italic" }} 
      href={url} 
      target="_blank"
    >
      {children}
    </a>
  );
};

const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  return contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const createLinkDecorator = () => new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link,
}]);

export const linkDecorator = createLinkDecorator();