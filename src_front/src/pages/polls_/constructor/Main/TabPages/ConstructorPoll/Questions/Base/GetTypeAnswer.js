import ASelectableSimple from "../../Answers/Base/Selectable/AnswSelectableSimple";
import ASelectableTest from "../../Answers/Base/Selectable/AnswSelectableTest";
import ATextInput from "../../Answers/Base/AnswTextInput";


const GetTypeAnswer = ({ answer, deleteAnswer, saveAnswer, one_answer_with_a_choice}) => {
    let resourcetype = answer.resourcetype;
    switch (resourcetype) {
        case "AnswerSelectableSimple":
            return <ASelectableSimple key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer} 
                one_answer_with_a_choice={one_answer_with_a_choice}/>;
        case "AnswerSelectableTest":
            return <ASelectableTest key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer}
                one_answer_with_a_choice={one_answer_with_a_choice} />;
        case "AnswerTextInput":
            return <ATextInput key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer} />;
        default:
            return;
    }
}
export default GetTypeAnswer;