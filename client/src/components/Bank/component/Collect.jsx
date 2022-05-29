import S from "./Collect.styled";
import C from "./../../CommonStyled";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";
import { useEffect, useState } from "react";

const Collect = () => {

    const account = useSelector(state => state.signup).account;
    const [nftReward, setNftReward] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(account?.nftReward){
            setNftReward(account.nftReward);
        }
    }, [account]);
    
    const handleCollect = async () => {
        if(account?.account){
            try {
                const res = await axios.get(`/user/withdraw/${account.account}`);
                dispatch(showNotification("수금이 완료되었습니다."));
                if(!res){
                    console.log(res);
                }
            } catch {
                dispatch(showNotification("수금에 실패하였습니다."));
            }
        } else {
            dispatch(showNotification("로그인이 필요합니다."));
        }
    }
    
    return (
        <S.Collect>
            <S.H2>수금</S.H2>
            <S.BorderDiv>
                <S.ColDiv>
                    <S.Div>
                        <S.Span>적립된 광산 수입</S.Span>
                        <S.SpanHighlight>{nftReward}</S.SpanHighlight>
                        <S.Span>CCT</S.Span>
                    </S.Div>
                    <S.Div>
                        <S.Span>수수료</S.Span>
                        <S.SpanHighlight>-{Number(nftReward * 0.1).toFixed(2)}</S.SpanHighlight>
                        <S.Span>수수료율 10%</S.Span>                        
                    </S.Div>
                </S.ColDiv>
            </S.BorderDiv>
            <S.Div>
                <S.Span>수금할 수 있는 토큰</S.Span>
                <S.SpanHighlight>{Number(nftReward * 0.9).toFixed(2)}</S.SpanHighlight>
                <S.Span>CCT</S.Span>
                {nftReward < 500 ? null 
                : <C.Button onClick={() => handleCollect()}>수금하기</C.Button>}
            </S.Div>
            {nftReward >= 500 ? null 
            : <S.P>500미만의 CCT는 수금할 수 없습니다.</S.P>}
        </S.Collect>
    );
}

export default Collect;