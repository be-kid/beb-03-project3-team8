import S from "./MissionDetail.styled";
import C from "../../components/CommonStyled";
import { useParams } from 'react-router-dom'
import { Information, Scoring } from "./../../components/MissionDetail";
import Editor from "./../../components/Editor"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defautCode } from "./../../assets/constants";
import Login from "./../../components/Login";
import axios from 'axios';
import { useMutation } from "react-query";
import { showNotification } from "../../redux/action";
import { onLoading, offLoading } from "../../redux/reducer/loadingSlice";
import { dummydata } from "../../assets/dummydata";

const MissionDetail = () => {
    const id = parseInt(useParams().id);
    const [code, setCode] = useState(defautCode);
    const [syntaxError, setSyntaxError] = useState([]);
    const [grading, setGrading] = useState({});
    const state = useSelector(state => state.account);
    const dispatch = useDispatch();
    const dummy = dummydata.filter(el => el.id === id)[0];

    const submitAnswer = async () => {
        const url = `/mission/challenge`;
        const payload = {
            "account" : state.account,
            "missionId" : "mission1",
            "code" : code,
        }
        axios.post(url, payload)
                .then(el => setGrading(el.data))
                .catch(err => console.log(err));
    }

    const { mutate } = useMutation(submitAnswer);

    const handleSubmit = () => {
        dispatch(onLoading("채점중입니다"));
        setTimeout(() => {
            if(syntaxError.length === 0){
                mutate();
            } else {
                dispatch(showNotification("작성한 코드에 에러가 있습니다."));
            }
            dispatch(offLoading());
        }, 1000);
    };

    return (
        <S.MissionDetail>
            <Information data={dummy}/>
            {state.account ? 
                <>
                    <S.EditorDiv>
                        <S.SupportDiv>
                            {dummy.argTypes.length > 0 ? dummy.argTypes.map((el, idx) => 
                                <S.P key={idx}>{`${idx + 1}번째 인자의 타입은 ${el}입니다.`}</S.P>) 
                                : <S.P>인자가 필요하지 않습니다.</S.P>}
                            <C.Button onClick={handleSubmit}>제출 !</C.Button>
                        </S.SupportDiv>
                        <S.FunctionDiv>
                            <Editor handleCode={setCode} defautCode={defautCode} setSyntaxError={setSyntaxError}/>
                        </S.FunctionDiv>
                    </S.EditorDiv>
                    <Scoring grading={grading} id={id}/>
                </> 
                : <Login/>}
        </S.MissionDetail>
    );
}

export default MissionDetail;