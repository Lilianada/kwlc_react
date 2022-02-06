import {
   Request,
   showMessage,
   getMessage,
   getRequest,
   saltConst,
} from "../utils"
import { urls } from "../urls";
import { LoginAccessDTO, LoginDTO } from "../dto/login.dto";
import { apiStringStatus } from "./apiStatus.enum";
import { HashlidEncoDecode } from "../encodeDecode";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationItemDTO } from "../dto/Donate.dto";

export async function getDonationApi(): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.donation);
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: DonationItemDTO[];
      if (res.status) {         
         //save user profile info
         data = res.data.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }
      // showMessage(getMessage(res), res.status, localStorage);
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function getSingleDonationApi(id: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await getRequest(urls.baseUrl, urls.donation + "/" + id);
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: DonationItemDTO;
      if (res.status) {

         
         //save user profile info
         data = res.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function createDonationApi(requestData: DonationItemDTO, branchId: number): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.donation + "/" + branchId, requestData, false);
      //alert(JSON.stringify(res));
      // const hashlidEncoDecode: HashlidEncoDecode = new HashlidEncoDecode(saltConst);
      let data: DonationItemDTO;
      if (res.status) {
         //save user profile info
         data = res.data;
         
         // localStorage.setItem("userData", hashlidEncoDecode.encode(JSON.stringify(userData)));
         response.data = data;
         response.code = statusEnum.ok;
      }
      
   }
   catch(e) {
      response.message = e.toString();
   }
   
   return response.getResponse();
}

export async function editDonationApi(id:number, requetData: DonationItemDTO): Promise<ResponseDTO> {
   const response = new ResponseDTO();
   
   try {
      let res = await Request(urls.baseUrl, urls.updateDonation +"/"+ id, requetData, false, "PUT");
      let data: DonationItemDTO;
      if (res.status) {
         data = res.data;
         
         response.data = data;
         response.code = statusEnum.ok;
      }
   }
   catch(e) {
      response.message = e.toString();
   }
   return response.getResponse();
}