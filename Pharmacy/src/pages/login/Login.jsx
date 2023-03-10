import './login.css';
import { useContext, useState } from "react";
import styled from "styled-components";
import { useRef } from 'react';
import { Context } from '../../context/Context';
import { publicRequest } from '../../requestMethod';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cdn.sanity.io/images/0vv8moc6/drugtopics/362378764ff70708dc8f284d9057f85ab52a88ec-1000x667.png?fit=crop&auto=format")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;


const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await publicRequest.post('pharmacy/login',{
        pharmacyName: userRef.current.value,
        password: passwordRef.current.value
      })
    dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
      setError(err.response.data.message);
      dispatch({type: "LOGIN_FAILURE"})
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            // pattern='[a-z]*'
            placeholder="Pharmacy Name"
            ref={userRef}
            required
            pattern={"^[A-za-z ]{4,30}$"}
          />
          {<span className='fv'>eg. Local Pharmacy</span>}
          <Input
            placeholder="password"
            type="password"
            ref={passwordRef}
            required
          />
          <Button type="submit" disabled={isFetching} className="btn">LOGIN</Button>
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          {error && (
            <div className="danger">
            <p style={{width:"220px",alignSelf:"center"}}><strong>{error}</strong></p>
          </div>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;