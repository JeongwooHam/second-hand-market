import BasicButton from "components/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import OneController from "./OneController";

const Inputs = ({ control, errors, register }) => {
	const [description, setDescription] = useState("");
	const [check, setCheck] = useState(true);
	const [price, setPrice] = useState("");
	// priceRef = useRef();
	// 태그 추가되게 하는 로직
	const [tagValue, setTagValue] = useState("");
	const [taglist, setTaglist] = useState([]);

	useEffect(() => {
		setCheck(true);
		setPrice("0");
	}, []);

	const handleCheckedStatus = () => {
		setCheck(!check);
		console.log(check);

		if (!check) setPrice("0");
	};

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			e.preventDefault();
			const tag = {
				idx: Math.floor(Math.random() * 100000),
				Tag: {
					tag: tagValue,
				},
			};
			if (taglist.length < 5) {
				setTaglist(prev => [...prev, tag]);
				setTagValue("");
			}
		}
	};

	useEffect(() => {
		console.log(taglist);
		console.log(description);
	}, [taglist, description]);

	const handleInput = e => {
		const inputValue = e.target.value.replace(/\s/g, "  "); // 공백 제거
		// if (inputValue.length <= 6) 
		setTagValue(inputValue); // 6자 넘지 못하게
	};

	const handleDescription = e => {
		setDescription(e.target.value);
	};

	const formatter = new Intl.NumberFormat("en-US");
	const handlePrice = e => {
		const inputValue = e.target.value;
		if (check) {
			return;
		}

		if (inputValue === "") {
			setPrice("0");
			// priceRef.current.disabled;
		} else if (inputValue !== "") {
			const formattedValue = formatter.format(
				parseFloat(inputValue.replace(/,/g, "")),
			);
			setPrice(formattedValue);
		}
	};

	return (
		<div>
			<S.InputBox>
				<OneController
					name="title"
					control={control}
					errors={errors}
					variant={"primary"}
					color={"primary"}
					size={"full"}
					style={{ padding: "60px 30px 40px 136px" }}
					placeholder="물품 제목을 입력해주세요."
					maxLength={40}
				/>
				<S.Title>
					물품명 <S.Essential>*</S.Essential>
				</S.Title>
			</S.InputBox>
			<S.InputBoxAnother>
				<S.Title style={{ position: "initial", margin: "0" }}>태그</S.Title>
				<S.InputTop>
					<OneController
						name="tag"
						control={control}
						errors={errors}
						variant={"bgBox"}
						color={"primary"}
						size={"primary"}
						style={{ padding: "18px", width: "100%", marginTop: "20px" }}
						placeholder="태그를 선택하거나 입력할 수 있습니다.(태그 개수 최대 5개까지 가능, 6자 이하로 작성해주세요) / 추후에 form으로 감싸거나 enter 이벤트 줘야함!"
						onKeyPress={handleKeyPress}
						maxLength = {6}
						// value={tagValue}
						// onChange={handleInput}
					/>
					<S.ArrowDownIcon>
						<AiFillCaretDown />
					</S.ArrowDownIcon>
				</S.InputTop>
				<S.TagsBox>
					{taglist.map(tagItem => (
						<BasicButton key={tagItem.idx} color={"white"}>
							#{tagItem.Tag.tag}
							<GrFormClose size={20} onClick={() => console.log("삭제")} />
						</BasicButton>
					))}
				</S.TagsBox>
			</S.InputBoxAnother>
			<S.DescBox>
				<S.Title style={{ position: "inherit", margin: "0" }}>상품설명</S.Title>
				<S.Textarea
					value={description}
					onChange={handleDescription}
					placeholder="신뢰할 수 있는 거래를 위해 상품 설명을 상세히 적어주세요"
					maxLength={1000}
				/>
				<span>{description.length}/1000</span>
			</S.DescBox>
			<S.InputBox>
				<S.Title style={{ top: "-4px" }}>
					구분 <S.Essential>*</S.Essential>
				</S.Title>
				<S.CheckContainer>
					<S.Checking>
						<S.Checkbox
							type="radio"
							id="freeCheckbox"
							name="radio"
							checked={check}
							onChange={handleCheckedStatus}
						/>
						<label htmlFor="freeCheckbox">무료나눔</label>
					</S.Checking>
					<S.Checking>
						<S.Checkbox
							type="radio"
							id="usedCheckbox"
							name="radio"
							onChange={handleCheckedStatus}
						/>
						<label htmlFor="usedCheckbox">중고거래</label>
					</S.Checking>
				</S.CheckContainer>
			</S.InputBox>
			<S.InputBox style={{ borderBottom: "1.3px solid #d9d9d9" }}>
				<OneController
					placeholder="숫자만 입력해주세요"
					name="price"
					control={control}
					errors={errors}
					variant={"line"}
					value={price}
					onChange={handlePrice}
					style={{
						padding: "16px",
						height: "3rem",
						margin: "60px 10px 60px 130px",
					}}
					// ref = {priceRef}
				/>
				<S.Title style={{ top: "68px" }}>
					가격 <S.Essential>*</S.Essential>
				</S.Title>
				{/* {errors.price && <p>{errors.price.message}</p>} */}
				<span>원</span>
			</S.InputBox>
		</div>
	);
};

export default Inputs;

const TagsBox = styled.div`
	display: flex;
	margin-top: 20px;

	button {
		margin-right: 10px;
		padding: 10px;
		color: ${({ theme }) => theme.PALETTE.primary};
		display: flex;
		align-items: center;
		font-size: 16px;
		svg {
			margin-left: 20px;
		}
		path {
			stroke: ${({ theme }) => theme.PALETTE.primary};
		}
	}
`;

const InputBox = styled.div`
	position: relative;
	font-weight: bold;
`;

const InputBoxAnother = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1060px;
	padding: 60px 0px;
	border-bottom: 1.3px solid ${({ theme }) => theme.PALETTE.gray};
`;

const InputTop = styled.div`
	/* display: flex; */
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

const ArrowDownIcon = styled.div`
	position: absolute;
	right: 0;
	top: 18px;
	cursor: pointer;
	padding: 20px 16px 10px;
	svg {
	}
`;

const Title = styled.p`
	font-size: ${({ theme }) => theme.FONT_SIZE.semimedium};
	font-weight: bold;
	position: absolute;
	top: 50px;
	z-index: 1;
`;

const Essential = styled.span`
	color: ${({ theme }) => theme.PALETTE.primary};
`;

const DescBox = styled.div`
	margin: 60px 0;
	padding-bottom: 30px;
	border-bottom: 1.3px solid ${({ theme }) => theme.PALETTE.gray};

	& span {
		display: flex;
		justify-content: flex-end;
		margin-top: 8px;
	}
`;

const Textarea = styled.textarea`
	width: 100%;
	background-color: #f1f1f1;
	border: none;
	border-radius: 12px;
	padding: 40px 30px;
	margin-top: 30px;
`;

const CheckContainer = styled.div`
	display: flex;
	border-bottom: 1.3px solid ${({ theme }) => theme.PALETTE.gray};
	padding: 0 0 60px 90px;
`;

const Checking = styled.div`
	display: flex;
	align-items: center;
	margin-left: 40px;
	label {
		margin-left: 6px;
	}
`;

const Checkbox = styled.input`
	width: 16px;
	height: 16px;
	accent-color: ${({ theme }) => theme.PALETTE.darkPrimary};
`;

const S = {
	InputBox,
	InputBoxAnother,
	InputTop,
	Title,
	Essential,
	DescBox,
	Textarea,
	CheckContainer,
	Checking,
	Checkbox,
	TagsBox,
	ArrowDownIcon,
};
