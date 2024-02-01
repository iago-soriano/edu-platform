export const Element = ({ element, ContentComponent, QuestionComponent }) => {
  if (element.content && !element.question) {
    return <ContentComponent />;
  } else if (!element.content && element.question) {
    return <QuestionComponent />;
  }
  return <h1>What is this</h1>;
};
