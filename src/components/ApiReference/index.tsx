import axios from "axios";
import { Component, useState } from "react";

export interface CodeSample {
	language: "node" | "csharp" | "python";
	code: string;
	name?: string;
}

type ApiParam = any


const getInputTypeFromParamType = (type:string) =>{

	switch(type){
		case 'string': return 'text';
        case 'number': return 'number';
        case 'boolean': return 'checkbox';
        case 'object': return 'json';
        default: return 'text';
	}
}


export type ApiResponse = {

}

export interface ApiReferenceProps {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    description?: string;
    pathParams?: ApiParam[];
    queryParams?: ApiParam[];
    body?: ApiParam;
    responses: ApiResponse[];
    apiHost: string;
    testHost?: string;
    codeSamples?: CodeSample[];
    children?: Component;
    aptosNetwork?: "mainnet" | "testnet";
    disabled?: boolean;
}
export interface FormValues {
  path: object;
  query: object;
  body: object;
}


export const ApiReference = ({
	description,
	method,
	path,
	pathParams,
	queryParams,
	body,
	responses,
	apiHost,
	testHost,
	codeSamples,
	children,
	disabled,
}:ApiReferenceProps) => {
	const [data,setData] = useState(null);
	const handleDummyApiCall = async() =>{
		const response = await axios('https://dummyjson.com/products/1');
		console.log(response.data);
		setData(response.data);
	}
	return (
		<div>
			<div className="flex items-center">
				<div>API KEY</div>
				<input type="text" />
				<button onClick={handleDummyApiCall}>Submit</button>
			</div>

			<p>Body</p>
			<form>
				<label >Email</label>
				<input type="text" name="email" value={body.fields[0].example} />
			</form>

			{
				data && JSON.stringify(data)
			}

		</div>
	)
}
