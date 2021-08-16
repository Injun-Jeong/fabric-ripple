package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type Wallet struct {
	Account string `json:"account"`		// 계좌번호(지갑 식별 값)
	Token string `json:"token"`			// 토근 유형(KRW:한국, USD:미국)
	Bank string `json:"bank"`			// 담당 기관(은행)
	Balance string `json:"amount"`		// 잔고
	Date string `json:"date"`			// 마지막 거래 일자
	Idx int
}

type SmartContract struct {
}


/**
* 이름: Init
* 설명: 체인코드를 인스턴스화 할 때 호출되는 함수
 */
func (s *SmartContract) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}



/**
* 이름: Invoke
* 설명:
*   - 체인코드 호출 제어
*   - 실제 체인코드가 처리할 내용을 작성
 */
func (s *SmartContract) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()

	if function == "initWallet" {			// 새로운 지갑 생성
		return s.initWallet(stub, args)
	} else if function == "getWallet" {		// 지갑 정보 조회
		return s.getWallet(stub, args)
	} else if function == "transfer" {		// 송금
		return s.transfer(stub, args)
	}

	fmt.Println("Please check your function : " + function)
	return shim.Error("Unkown function")
}



/**
* 이름: generateAccount
* 설명: 지갑 계좌번호 생성
 */
func generateAccount(stub shim.ChaincodeStubInterface, args []string) []byte {
	// 계좌번호의 마지막 키인 'lastAccount' 값 조회
	lastAccountAsBytes, err := stub.GetState("lastAccount")
	if err != nil {
		fmt.Println(err.Error())
	}

	// 지갑 구조체 생성
	wallet := Wallet{}
	json.Unmarshal(lastAccountAsBytes, &wallet)

	// 조회된 지갑 정보가 없는 경우
	if len(wallet.Account) == 0 || wallet.Account == "" {
		// 계좌 번호 = "토큰 유형".concat("거래은행").concat("채번")
		wallet.Account = args[0] + args[1] + "1"
		wallet.Idx = 1
	} else {
		wallet.Idx = wallet.Idx + 1
		tempIdx := strconv.Itoa(wallet.Idx)
		wallet.Account = args[0] + args[1] + tempIdx
	}

	// 생성된 계좌번호가 세팅된 지갑을 JSON 형식으로 변환
	returnValueBytes, _ := json.Marshal(wallet)
	return returnValueBytes
}



/**
* 이름: initWallet
* 설명: 새로운 지갑 생성
 */
func (s *SmartContract) initWallet(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")		// [토근유형, 담당기관, 잔고]
	}

	/* 새로운 계좌번호 생성 */
	var wallet = Wallet{}
	json.Unmarshal(generateAccount(stub, args), &wallet)

	/* 지갑 정보 세팅 */
	wallet.Token = args[0]
	wallet.Bank = args[1]
	wallet.Balance = args[2]
	wallet.Date = time.Now().String()

	/* 생성된 지갑 원장에 저장 */
	walletAsJsonBytes, _ := json.Marshal(wallet)
	fmt.Println("account is " + wallet.Account)
	err := stub.PutState(wallet.Account, walletAsJsonBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record wallet catch: %s", wallet.Account))
	}

	/* 마지막으로 생성된 계좌 원장에 저장 */
	stub.PutState("lastAccount", walletAsJsonBytes)

	return shim.Success(nil)
}



/**
* 이름: getWallet
* 설명: 지갑 정보 조회
 */
func (s *SmartContract) getWallet(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	// 계좌번호(args[0])로 지갑 정보 조회
	walletAsBytes, err := stub.GetState(args[0])
	if err != nil {
		fmt.Println(err.Error())
	}

	wallet := Wallet{}
	json.Unmarshal(walletAsBytes, &wallet)

	var buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten := false

	if bArrayMemberAlreadyWritten == true {
		buffer.WriteString(",")
	}

	// 계좌번호
	buffer.WriteString("{\"Account\":")
	buffer.WriteString("\"")
	buffer.WriteString(wallet.Account)
	buffer.WriteString("\"")

	// 토큰유형
	buffer.WriteString("\"Token\":")
	buffer.WriteString("\"")
	buffer.WriteString(wallet.Token)
	buffer.WriteString("\"")

	// 담당 기관(은행)
	buffer.WriteString("\"Bank\":")
	buffer.WriteString("\"")
	buffer.WriteString(wallet.Bank)
	buffer.WriteString("\"")

	// 잔액
	buffer.WriteString("\"Balance\":")
	buffer.WriteString("\"")
	buffer.WriteString(wallet.Balance)
	buffer.WriteString("\"")

	// 마지막 거래 일자
	buffer.WriteString("\"Date\":")
	buffer.WriteString("\"")
	buffer.WriteString(wallet.Date)
	buffer.WriteString("\"")

	buffer.WriteString("}")
	bArrayMemberAlreadyWritten = true
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}



/**
* 이름: transfer
* 설명: 송금
 */
func (s *SmartContract) transfer(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	// todo
	return shim.Success(nil)
}



/**
* 이름: main
* 설명: 체인코드를 실행하는 메인 함수
 */
func main() {
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error starting exchange chaincode: %s", err)
	}
}