import axios from "axios";
import { Component, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import ReactMarkdown from "react-markdown";
import Tabs from "@theme/Tabs";
import { RotateCw } from "lucide-react";
import { cn } from "@site/src/lib/utils";
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


export type ApiResponse = any

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
	
	
	const [fetchedResponse,setFetchedResponse] = useState(null);
	const [fetchingResponse,setFetchingResponse] = useState(false);


	const [email,setEmail] = useState<any>("shanu@lync.world");
	const [dashboardApiKey,setDashboardApiKey] = useState<any>("YOU API KEY");
	const [xApiKey,setXApiKey] = useState<any>("");
	const [network,setNetwork] = useState<any>("2");


	const handleApiCall = async() =>{
		try {
			
			setFetchingResponse(true);
			const response = await axios.post(apiHost+path,{
				
				email,
				apiKey:dashboardApiKey,
				network,
				
			},{
				
				headers:{
					"Content-Type": "application/json",
  					"x-api-key": xApiKey,
				},
				
			});
			console.log(response.data);
			setFetchedResponse(response.data);
			setFetchingResponse(false);
		} catch (error) {
			setFetchedResponse(error.response.data);
			setFetchingResponse(false);
			console.log(error);
			
		}
	}
	
	return (
		<div className="w-full">
			

			<div className="w-full lg:grid lg:grid-cols-2 ">
				<div>
					<div>

						<h3>Body</h3>

						{(body.fields.slice(0,1)).map((field) => (<div >
							<div className="space-x-3">
								<span>{field.name}</span>
								<input onChange={(e) => setEmail(e.target.value)} className="bg-[#152c1f] w-52  border-[0.5px] border-green-600 outline-none rounded-md px-3 py-2" type="text" value={email} />
							</div>
							
							<h6>

									<ReactMarkdown>{field.description}</ReactMarkdown>
							</h6>
							
						</div>))}
						{(body.fields.slice(-2,-1)).map((field) => (<div >
							<div className="space-x-3">
								<span>{field.name}</span>
								<input onChange={(e) => setDashboardApiKey(e.target.value)} className="bg-[#152c1f] w-52 border-[0.5px] border-green-600 outline-none rounded-md px-3 py-2" type="text" value={dashboardApiKey } />
							</div>
							
							<h6>

									<ReactMarkdown>{field.description}</ReactMarkdown>
							</h6>
							
						</div>))}
						{(body.fields.slice(-1)).map((field) => (<div >
							<div className="space-x-3">
								<span>{field.name}</span>
								<select onChange={(e) => setNetwork(e.target.value)} value={network} className="bg-[#152c1f] w-52 border-[0.5px] border-green-600 outline-none rounded-md px-3 py-2" name="" id="">
									<option value="1">1 (Mainnet)</option>
									<option value="2">2 (Testnet)</option>
								</select>
								
							</div>
							
							<h6>

									<ReactMarkdown>{field.description}</ReactMarkdown>
							</h6>
							
						</div>))}
					</div>
					<div>

						<h3>Headers</h3>
						<div >
							<div className="space-x-3">
								<span>{'x-api-key'}</span>
								<input onChange={(e) => setXApiKey(e.target.value)} className="bg-[#152c1f] w-52 border-[0.5px] border-green-600 outline-none rounded-md px-3 py-2" type="text" value={xApiKey } />
								
							</div>
							
							<h6 className="w-[80%]">

									<ReactMarkdown>{'API key to be put into the header as x-api-key for the validation of HTTP requests on our server'}</ReactMarkdown>
							</h6>
							
						</div>
						
					</div>
						<button onClick={handleApiCall} disabled={fetchingResponse} 
							className={cn(" flex items-center justify-center w-32 bg-[var(--ifm-color-primary)] border-none py-2 px-3 rounded-md text-xl cursor-pointer",
							fetchingResponse && "brightness-50"
						)}>
							{
								fetchingResponse ?
									<RotateCw className="animate-spin" />
									:
								'Test API'
							}
							
						</button>
				</div>
				<div className="space-y-3">
					
					<div>
						<h2>Response</h2>
						<CodeBlock language="json">
							
							{!fetchedResponse ? JSON.stringify(responses[0].body, null, 4) : JSON.stringify(fetchedResponse, null, 4)}
						</CodeBlock>
					</div>
				</div>
			</div>
			

			
			
		</div>
	)
}
