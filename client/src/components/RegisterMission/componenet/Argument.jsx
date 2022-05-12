import S from "./Argument.styled";

const Argument = ({index, handleArgTypes, handleEmptyTestcase}) => {

    const handleChangeInput = (obj, idx) => {
        handleArgTypes(idx, obj);
    }
    
    return (
        <S.Argument>
            <S.P>{`${index + 1}번째 인자`}</S.P>
            <S.Input type="text" placeholder="변수 이름" onChange={(e) => handleChangeInput({name: e.target.value}, index)}/>
            <S.Label>is required</S.Label>
            <S.Input type="checkbox" onChange={(e) => handleChangeInput({required: e.target.checked}, index)}/>
            <S.Label>인자의 type</S.Label>
            <S.Select name="type" onChange={(e) => {
                                    handleChangeInput({type: e.target.value}, index);
                                    handleEmptyTestcase();
                                }}>
                <S.Option value="string">문자열</S.Option>
                <S.Option value="number">숫자</S.Option>
                <S.Option value="boolean">부울</S.Option>
                <S.Option value="object">객체</S.Option>
                <S.Option value="array">배열</S.Option>
            </S.Select>
            <S.Input type="text" placeholder="description" onChange={(e) => handleChangeInput({description: e.target.value}, index)}/>
        </S.Argument>
    );
}

export default Argument;