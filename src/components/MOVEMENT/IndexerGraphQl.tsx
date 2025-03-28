import { createGraphiQLFetcher } from "@graphiql/create-fetcher";
import { QueryEditor } from '@graphiql/react';
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { useState } from "react";

const CHAINS = {
    ETH: "ETH",
    FUEL: "FUEL",
};

type TChain = typeof CHAINS[keyof typeof CHAINS]



const INDEXER_URL = 'https://mevm-devnet.lync.world/subgraphs/name/mevm/getNftBalances'


const defaultQuery = `
    {
        getNftBalances(first:100) {
            id
            owner
            amount
            nft {
                id
                contractAddress
                name
                symbol
            }
        }
    }
`;
export const IndexerGraphQl = () => {
    
    const fetcher = createGraphiQLFetcher({
		url:  INDEXER_URL,
	});
    
    
    
    
    return (
        <div>
            <GraphiQL fetcher={fetcher as any}  defaultQuery={defaultQuery} className="min-h-[70vh]">
                
                
                
                <QueryEditor />
            </GraphiQL>
        </div>
    )
}
