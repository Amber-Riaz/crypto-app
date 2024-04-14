import React, { useEffect, useState } from "react";
import {
  Heading,
  Image,
  VStack,
  Text,
  Button,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import { Container } from "@chakra-ui/react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ErrorComponents from "./ErrorComponents";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("pkr");

  const currencysymbol =
    currency === "pkr" ? "Rs " : currency === "eur " ? "€" : "$ ";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponents message={"Error while fetching coins"} />;

  return (
    <Container maxW={"containter.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value={"pkr"}> Pk Rs </Radio>
              <Radio value={"usd"}> USD $ </Radio>
              <Radio value={"euro"}> EURO € </Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCrads
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                symbol={i.symbol}
                currencysymbol={currencysymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={8}>
            {btns.map((items, index) => (
              <Button
                key={index}
                onClick={() => changePage(index + 1)}
                bgColor={"blackAlpha.900"}
                color={"white"}
              >
                {" "}
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCrads = ({
  id,
  img,
  name,
  symbol,
  price,
  currencysymbol = "Rs ",
}) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.5s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt="Image" />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencysymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins;
