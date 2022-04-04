import * as $protobuf from "protobufjs";
/** Namespace gravity. */
export namespace gravity {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a BridgeValidator. */
        interface IBridgeValidator {

            /** BridgeValidator power */
            power?: (Long|null);

            /** BridgeValidator ethereum_address */
            ethereum_address?: (string|null);
        }

        /** Represents a BridgeValidator. */
        class BridgeValidator implements IBridgeValidator {

            /**
             * Constructs a new BridgeValidator.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IBridgeValidator);

            /** BridgeValidator power. */
            public power: Long;

            /** BridgeValidator ethereum_address. */
            public ethereum_address: string;

            /**
             * Encodes the specified BridgeValidator message. Does not implicitly {@link gravity.v1.BridgeValidator.verify|verify} messages.
             * @param message BridgeValidator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IBridgeValidator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BridgeValidator message, length delimited. Does not implicitly {@link gravity.v1.BridgeValidator.verify|verify} messages.
             * @param message BridgeValidator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IBridgeValidator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BridgeValidator message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BridgeValidator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.BridgeValidator;

            /**
             * Decodes a BridgeValidator message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BridgeValidator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.BridgeValidator;

            /**
             * Verifies a BridgeValidator message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BridgeValidator message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BridgeValidator
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.BridgeValidator;

            /**
             * Creates a plain object from a BridgeValidator message. Also converts values to other types if specified.
             * @param message BridgeValidator
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.BridgeValidator, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BridgeValidator to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Valset. */
        interface IValset {

            /** Valset nonce */
            nonce?: (Long|null);

            /** Valset members */
            members?: (gravity.v1.IBridgeValidator[]|null);

            /** Valset height */
            height?: (Long|null);

            /** Valset reward_amount */
            reward_amount?: (string|null);

            /** Valset reward_token */
            reward_token?: (string|null);
        }

        /** Represents a Valset. */
        class Valset implements IValset {

            /**
             * Constructs a new Valset.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IValset);

            /** Valset nonce. */
            public nonce: Long;

            /** Valset members. */
            public members: gravity.v1.IBridgeValidator[];

            /** Valset height. */
            public height: Long;

            /** Valset reward_amount. */
            public reward_amount: string;

            /** Valset reward_token. */
            public reward_token: string;

            /**
             * Encodes the specified Valset message. Does not implicitly {@link gravity.v1.Valset.verify|verify} messages.
             * @param message Valset message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IValset, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Valset message, length delimited. Does not implicitly {@link gravity.v1.Valset.verify|verify} messages.
             * @param message Valset message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IValset, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Valset message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Valset
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.Valset;

            /**
             * Decodes a Valset message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Valset
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.Valset;

            /**
             * Verifies a Valset message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Valset message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Valset
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.Valset;

            /**
             * Creates a plain object from a Valset message. Also converts values to other types if specified.
             * @param message Valset
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.Valset, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Valset to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LastObservedEthereumBlockHeight. */
        interface ILastObservedEthereumBlockHeight {

            /** LastObservedEthereumBlockHeight cosmos_block_height */
            cosmos_block_height?: (Long|null);

            /** LastObservedEthereumBlockHeight ethereum_block_height */
            ethereum_block_height?: (Long|null);

            /** LastObservedEthereumBlockHeight cosmos_block_time_ms */
            cosmos_block_time_ms?: (Long|null);
        }

        /** Represents a LastObservedEthereumBlockHeight. */
        class LastObservedEthereumBlockHeight implements ILastObservedEthereumBlockHeight {

            /**
             * Constructs a new LastObservedEthereumBlockHeight.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.ILastObservedEthereumBlockHeight);

            /** LastObservedEthereumBlockHeight cosmos_block_height. */
            public cosmos_block_height: Long;

            /** LastObservedEthereumBlockHeight ethereum_block_height. */
            public ethereum_block_height: Long;

            /** LastObservedEthereumBlockHeight cosmos_block_time_ms. */
            public cosmos_block_time_ms: Long;

            /**
             * Encodes the specified LastObservedEthereumBlockHeight message. Does not implicitly {@link gravity.v1.LastObservedEthereumBlockHeight.verify|verify} messages.
             * @param message LastObservedEthereumBlockHeight message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.ILastObservedEthereumBlockHeight, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LastObservedEthereumBlockHeight message, length delimited. Does not implicitly {@link gravity.v1.LastObservedEthereumBlockHeight.verify|verify} messages.
             * @param message LastObservedEthereumBlockHeight message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.ILastObservedEthereumBlockHeight, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LastObservedEthereumBlockHeight message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LastObservedEthereumBlockHeight
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.LastObservedEthereumBlockHeight;

            /**
             * Decodes a LastObservedEthereumBlockHeight message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LastObservedEthereumBlockHeight
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.LastObservedEthereumBlockHeight;

            /**
             * Verifies a LastObservedEthereumBlockHeight message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LastObservedEthereumBlockHeight message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LastObservedEthereumBlockHeight
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.LastObservedEthereumBlockHeight;

            /**
             * Creates a plain object from a LastObservedEthereumBlockHeight message. Also converts values to other types if specified.
             * @param message LastObservedEthereumBlockHeight
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.LastObservedEthereumBlockHeight, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LastObservedEthereumBlockHeight to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ERC20ToDenom. */
        interface IERC20ToDenom {

            /** ERC20ToDenom erc20 */
            erc20?: (string|null);

            /** ERC20ToDenom denom */
            denom?: (string|null);
        }

        /** Represents a ERC20ToDenom. */
        class ERC20ToDenom implements IERC20ToDenom {

            /**
             * Constructs a new ERC20ToDenom.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IERC20ToDenom);

            /** ERC20ToDenom erc20. */
            public erc20: string;

            /** ERC20ToDenom denom. */
            public denom: string;

            /**
             * Encodes the specified ERC20ToDenom message. Does not implicitly {@link gravity.v1.ERC20ToDenom.verify|verify} messages.
             * @param message ERC20ToDenom message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IERC20ToDenom, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ERC20ToDenom message, length delimited. Does not implicitly {@link gravity.v1.ERC20ToDenom.verify|verify} messages.
             * @param message ERC20ToDenom message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IERC20ToDenom, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ERC20ToDenom message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ERC20ToDenom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.ERC20ToDenom;

            /**
             * Decodes a ERC20ToDenom message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ERC20ToDenom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.ERC20ToDenom;

            /**
             * Verifies a ERC20ToDenom message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ERC20ToDenom message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ERC20ToDenom
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.ERC20ToDenom;

            /**
             * Creates a plain object from a ERC20ToDenom message. Also converts values to other types if specified.
             * @param message ERC20ToDenom
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.ERC20ToDenom, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ERC20ToDenom to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a Msg */
        class Msg extends $protobuf.rpc.Service {

            /**
             * Constructs a new Msg service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls ValsetConfirm.
             * @param request MsgValsetConfirm message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgValsetConfirmResponse
             */
            public valsetConfirm(request: gravity.v1.IMsgValsetConfirm, callback: gravity.v1.Msg.ValsetConfirmCallback): void;

            /**
             * Calls ValsetConfirm.
             * @param request MsgValsetConfirm message or plain object
             * @returns Promise
             */
            public valsetConfirm(request: gravity.v1.IMsgValsetConfirm): Promise<gravity.v1.MsgValsetConfirmResponse>;

            /**
             * Calls SendToEth.
             * @param request MsgSendToEth message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgSendToEthResponse
             */
            public sendToEth(request: gravity.v1.IMsgSendToEth, callback: gravity.v1.Msg.SendToEthCallback): void;

            /**
             * Calls SendToEth.
             * @param request MsgSendToEth message or plain object
             * @returns Promise
             */
            public sendToEth(request: gravity.v1.IMsgSendToEth): Promise<gravity.v1.MsgSendToEthResponse>;

            /**
             * Calls SetMinFeeTransferToEth.
             * @param request MsgSetMinFeeTransferToEth message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgSetMinFeeTransferToEthResponse
             */
            public setMinFeeTransferToEth(request: gravity.v1.IMsgSetMinFeeTransferToEth, callback: gravity.v1.Msg.SetMinFeeTransferToEthCallback): void;

            /**
             * Calls SetMinFeeTransferToEth.
             * @param request MsgSetMinFeeTransferToEth message or plain object
             * @returns Promise
             */
            public setMinFeeTransferToEth(request: gravity.v1.IMsgSetMinFeeTransferToEth): Promise<gravity.v1.MsgSetMinFeeTransferToEthResponse>;

            /**
             * Calls RequestBatch.
             * @param request MsgRequestBatch message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgRequestBatchResponse
             */
            public requestBatch(request: gravity.v1.IMsgRequestBatch, callback: gravity.v1.Msg.RequestBatchCallback): void;

            /**
             * Calls RequestBatch.
             * @param request MsgRequestBatch message or plain object
             * @returns Promise
             */
            public requestBatch(request: gravity.v1.IMsgRequestBatch): Promise<gravity.v1.MsgRequestBatchResponse>;

            /**
             * Calls ConfirmBatch.
             * @param request MsgConfirmBatch message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgConfirmBatchResponse
             */
            public confirmBatch(request: gravity.v1.IMsgConfirmBatch, callback: gravity.v1.Msg.ConfirmBatchCallback): void;

            /**
             * Calls ConfirmBatch.
             * @param request MsgConfirmBatch message or plain object
             * @returns Promise
             */
            public confirmBatch(request: gravity.v1.IMsgConfirmBatch): Promise<gravity.v1.MsgConfirmBatchResponse>;

            /**
             * Calls ConfirmLogicCall.
             * @param request MsgConfirmLogicCall message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgConfirmLogicCallResponse
             */
            public confirmLogicCall(request: gravity.v1.IMsgConfirmLogicCall, callback: gravity.v1.Msg.ConfirmLogicCallCallback): void;

            /**
             * Calls ConfirmLogicCall.
             * @param request MsgConfirmLogicCall message or plain object
             * @returns Promise
             */
            public confirmLogicCall(request: gravity.v1.IMsgConfirmLogicCall): Promise<gravity.v1.MsgConfirmLogicCallResponse>;

            /**
             * Calls SendToCosmosClaim.
             * @param request MsgSendToCosmosClaim message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgSendToCosmosClaimResponse
             */
            public sendToCosmosClaim(request: gravity.v1.IMsgSendToCosmosClaim, callback: gravity.v1.Msg.SendToCosmosClaimCallback): void;

            /**
             * Calls SendToCosmosClaim.
             * @param request MsgSendToCosmosClaim message or plain object
             * @returns Promise
             */
            public sendToCosmosClaim(request: gravity.v1.IMsgSendToCosmosClaim): Promise<gravity.v1.MsgSendToCosmosClaimResponse>;

            /**
             * Calls BatchSendToEthClaim.
             * @param request MsgBatchSendToEthClaim message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgBatchSendToEthClaimResponse
             */
            public batchSendToEthClaim(request: gravity.v1.IMsgBatchSendToEthClaim, callback: gravity.v1.Msg.BatchSendToEthClaimCallback): void;

            /**
             * Calls BatchSendToEthClaim.
             * @param request MsgBatchSendToEthClaim message or plain object
             * @returns Promise
             */
            public batchSendToEthClaim(request: gravity.v1.IMsgBatchSendToEthClaim): Promise<gravity.v1.MsgBatchSendToEthClaimResponse>;

            /**
             * Calls ValsetUpdateClaim.
             * @param request MsgValsetUpdatedClaim message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgValsetUpdatedClaimResponse
             */
            public valsetUpdateClaim(request: gravity.v1.IMsgValsetUpdatedClaim, callback: gravity.v1.Msg.ValsetUpdateClaimCallback): void;

            /**
             * Calls ValsetUpdateClaim.
             * @param request MsgValsetUpdatedClaim message or plain object
             * @returns Promise
             */
            public valsetUpdateClaim(request: gravity.v1.IMsgValsetUpdatedClaim): Promise<gravity.v1.MsgValsetUpdatedClaimResponse>;

            /**
             * Calls ERC20DeployedClaim.
             * @param request MsgERC20DeployedClaim message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgERC20DeployedClaimResponse
             */
            public eRC20DeployedClaim(request: gravity.v1.IMsgERC20DeployedClaim, callback: gravity.v1.Msg.ERC20DeployedClaimCallback): void;

            /**
             * Calls ERC20DeployedClaim.
             * @param request MsgERC20DeployedClaim message or plain object
             * @returns Promise
             */
            public eRC20DeployedClaim(request: gravity.v1.IMsgERC20DeployedClaim): Promise<gravity.v1.MsgERC20DeployedClaimResponse>;

            /**
             * Calls LogicCallExecutedClaim.
             * @param request MsgLogicCallExecutedClaim message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgLogicCallExecutedClaimResponse
             */
            public logicCallExecutedClaim(request: gravity.v1.IMsgLogicCallExecutedClaim, callback: gravity.v1.Msg.LogicCallExecutedClaimCallback): void;

            /**
             * Calls LogicCallExecutedClaim.
             * @param request MsgLogicCallExecutedClaim message or plain object
             * @returns Promise
             */
            public logicCallExecutedClaim(request: gravity.v1.IMsgLogicCallExecutedClaim): Promise<gravity.v1.MsgLogicCallExecutedClaimResponse>;

            /**
             * Calls SetOrchestratorAddress.
             * @param request MsgSetOrchestratorAddress message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgSetOrchestratorAddressResponse
             */
            public setOrchestratorAddress(request: gravity.v1.IMsgSetOrchestratorAddress, callback: gravity.v1.Msg.SetOrchestratorAddressCallback): void;

            /**
             * Calls SetOrchestratorAddress.
             * @param request MsgSetOrchestratorAddress message or plain object
             * @returns Promise
             */
            public setOrchestratorAddress(request: gravity.v1.IMsgSetOrchestratorAddress): Promise<gravity.v1.MsgSetOrchestratorAddressResponse>;

            /**
             * Calls CancelSendToEth.
             * @param request MsgCancelSendToEth message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgCancelSendToEthResponse
             */
            public cancelSendToEth(request: gravity.v1.IMsgCancelSendToEth, callback: gravity.v1.Msg.CancelSendToEthCallback): void;

            /**
             * Calls CancelSendToEth.
             * @param request MsgCancelSendToEth message or plain object
             * @returns Promise
             */
            public cancelSendToEth(request: gravity.v1.IMsgCancelSendToEth): Promise<gravity.v1.MsgCancelSendToEthResponse>;

            /**
             * Calls SubmitBadSignatureEvidence.
             * @param request MsgSubmitBadSignatureEvidence message or plain object
             * @param callback Node-style callback called with the error, if any, and MsgSubmitBadSignatureEvidenceResponse
             */
            public submitBadSignatureEvidence(request: gravity.v1.IMsgSubmitBadSignatureEvidence, callback: gravity.v1.Msg.SubmitBadSignatureEvidenceCallback): void;

            /**
             * Calls SubmitBadSignatureEvidence.
             * @param request MsgSubmitBadSignatureEvidence message or plain object
             * @returns Promise
             */
            public submitBadSignatureEvidence(request: gravity.v1.IMsgSubmitBadSignatureEvidence): Promise<gravity.v1.MsgSubmitBadSignatureEvidenceResponse>;
        }

        namespace Msg {

            /**
             * Callback as used by {@link gravity.v1.Msg#valsetConfirm}.
             * @param error Error, if any
             * @param [response] MsgValsetConfirmResponse
             */
            type ValsetConfirmCallback = (error: (Error|null), response?: gravity.v1.MsgValsetConfirmResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#sendToEth}.
             * @param error Error, if any
             * @param [response] MsgSendToEthResponse
             */
            type SendToEthCallback = (error: (Error|null), response?: gravity.v1.MsgSendToEthResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#setMinFeeTransferToEth}.
             * @param error Error, if any
             * @param [response] MsgSetMinFeeTransferToEthResponse
             */
            type SetMinFeeTransferToEthCallback = (error: (Error|null), response?: gravity.v1.MsgSetMinFeeTransferToEthResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#requestBatch}.
             * @param error Error, if any
             * @param [response] MsgRequestBatchResponse
             */
            type RequestBatchCallback = (error: (Error|null), response?: gravity.v1.MsgRequestBatchResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#confirmBatch}.
             * @param error Error, if any
             * @param [response] MsgConfirmBatchResponse
             */
            type ConfirmBatchCallback = (error: (Error|null), response?: gravity.v1.MsgConfirmBatchResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#confirmLogicCall}.
             * @param error Error, if any
             * @param [response] MsgConfirmLogicCallResponse
             */
            type ConfirmLogicCallCallback = (error: (Error|null), response?: gravity.v1.MsgConfirmLogicCallResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#sendToCosmosClaim}.
             * @param error Error, if any
             * @param [response] MsgSendToCosmosClaimResponse
             */
            type SendToCosmosClaimCallback = (error: (Error|null), response?: gravity.v1.MsgSendToCosmosClaimResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#batchSendToEthClaim}.
             * @param error Error, if any
             * @param [response] MsgBatchSendToEthClaimResponse
             */
            type BatchSendToEthClaimCallback = (error: (Error|null), response?: gravity.v1.MsgBatchSendToEthClaimResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#valsetUpdateClaim}.
             * @param error Error, if any
             * @param [response] MsgValsetUpdatedClaimResponse
             */
            type ValsetUpdateClaimCallback = (error: (Error|null), response?: gravity.v1.MsgValsetUpdatedClaimResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#eRC20DeployedClaim}.
             * @param error Error, if any
             * @param [response] MsgERC20DeployedClaimResponse
             */
            type ERC20DeployedClaimCallback = (error: (Error|null), response?: gravity.v1.MsgERC20DeployedClaimResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#logicCallExecutedClaim}.
             * @param error Error, if any
             * @param [response] MsgLogicCallExecutedClaimResponse
             */
            type LogicCallExecutedClaimCallback = (error: (Error|null), response?: gravity.v1.MsgLogicCallExecutedClaimResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#setOrchestratorAddress}.
             * @param error Error, if any
             * @param [response] MsgSetOrchestratorAddressResponse
             */
            type SetOrchestratorAddressCallback = (error: (Error|null), response?: gravity.v1.MsgSetOrchestratorAddressResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#cancelSendToEth}.
             * @param error Error, if any
             * @param [response] MsgCancelSendToEthResponse
             */
            type CancelSendToEthCallback = (error: (Error|null), response?: gravity.v1.MsgCancelSendToEthResponse) => void;

            /**
             * Callback as used by {@link gravity.v1.Msg#submitBadSignatureEvidence}.
             * @param error Error, if any
             * @param [response] MsgSubmitBadSignatureEvidenceResponse
             */
            type SubmitBadSignatureEvidenceCallback = (error: (Error|null), response?: gravity.v1.MsgSubmitBadSignatureEvidenceResponse) => void;
        }

        /** Properties of a MsgSetOrchestratorAddress. */
        interface IMsgSetOrchestratorAddress {

            /** MsgSetOrchestratorAddress validator */
            validator?: (string|null);

            /** MsgSetOrchestratorAddress orchestrator */
            orchestrator?: (string|null);

            /** MsgSetOrchestratorAddress eth_address */
            eth_address?: (string|null);
        }

        /** Represents a MsgSetOrchestratorAddress. */
        class MsgSetOrchestratorAddress implements IMsgSetOrchestratorAddress {

            /**
             * Constructs a new MsgSetOrchestratorAddress.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSetOrchestratorAddress);

            /** MsgSetOrchestratorAddress validator. */
            public validator: string;

            /** MsgSetOrchestratorAddress orchestrator. */
            public orchestrator: string;

            /** MsgSetOrchestratorAddress eth_address. */
            public eth_address: string;

            /**
             * Encodes the specified MsgSetOrchestratorAddress message. Does not implicitly {@link gravity.v1.MsgSetOrchestratorAddress.verify|verify} messages.
             * @param message MsgSetOrchestratorAddress message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSetOrchestratorAddress, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSetOrchestratorAddress message, length delimited. Does not implicitly {@link gravity.v1.MsgSetOrchestratorAddress.verify|verify} messages.
             * @param message MsgSetOrchestratorAddress message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSetOrchestratorAddress, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSetOrchestratorAddress message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSetOrchestratorAddress
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSetOrchestratorAddress;

            /**
             * Decodes a MsgSetOrchestratorAddress message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSetOrchestratorAddress
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSetOrchestratorAddress;

            /**
             * Verifies a MsgSetOrchestratorAddress message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSetOrchestratorAddress message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSetOrchestratorAddress
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSetOrchestratorAddress;

            /**
             * Creates a plain object from a MsgSetOrchestratorAddress message. Also converts values to other types if specified.
             * @param message MsgSetOrchestratorAddress
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSetOrchestratorAddress, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSetOrchestratorAddress to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetOrchestratorAddressResponse. */
        interface IMsgSetOrchestratorAddressResponse {
        }

        /** Represents a MsgSetOrchestratorAddressResponse. */
        class MsgSetOrchestratorAddressResponse implements IMsgSetOrchestratorAddressResponse {

            /**
             * Constructs a new MsgSetOrchestratorAddressResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSetOrchestratorAddressResponse);

            /**
             * Encodes the specified MsgSetOrchestratorAddressResponse message. Does not implicitly {@link gravity.v1.MsgSetOrchestratorAddressResponse.verify|verify} messages.
             * @param message MsgSetOrchestratorAddressResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSetOrchestratorAddressResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSetOrchestratorAddressResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgSetOrchestratorAddressResponse.verify|verify} messages.
             * @param message MsgSetOrchestratorAddressResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSetOrchestratorAddressResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSetOrchestratorAddressResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSetOrchestratorAddressResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSetOrchestratorAddressResponse;

            /**
             * Decodes a MsgSetOrchestratorAddressResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSetOrchestratorAddressResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSetOrchestratorAddressResponse;

            /**
             * Verifies a MsgSetOrchestratorAddressResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSetOrchestratorAddressResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSetOrchestratorAddressResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSetOrchestratorAddressResponse;

            /**
             * Creates a plain object from a MsgSetOrchestratorAddressResponse message. Also converts values to other types if specified.
             * @param message MsgSetOrchestratorAddressResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSetOrchestratorAddressResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSetOrchestratorAddressResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgValsetConfirm. */
        interface IMsgValsetConfirm {

            /** MsgValsetConfirm nonce */
            nonce?: (Long|null);

            /** MsgValsetConfirm orchestrator */
            orchestrator?: (string|null);

            /** MsgValsetConfirm eth_address */
            eth_address?: (string|null);

            /** MsgValsetConfirm signature */
            signature?: (string|null);
        }

        /** Represents a MsgValsetConfirm. */
        class MsgValsetConfirm implements IMsgValsetConfirm {

            /**
             * Constructs a new MsgValsetConfirm.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgValsetConfirm);

            /** MsgValsetConfirm nonce. */
            public nonce: Long;

            /** MsgValsetConfirm orchestrator. */
            public orchestrator: string;

            /** MsgValsetConfirm eth_address. */
            public eth_address: string;

            /** MsgValsetConfirm signature. */
            public signature: string;

            /**
             * Encodes the specified MsgValsetConfirm message. Does not implicitly {@link gravity.v1.MsgValsetConfirm.verify|verify} messages.
             * @param message MsgValsetConfirm message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgValsetConfirm, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgValsetConfirm message, length delimited. Does not implicitly {@link gravity.v1.MsgValsetConfirm.verify|verify} messages.
             * @param message MsgValsetConfirm message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgValsetConfirm, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgValsetConfirm message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgValsetConfirm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgValsetConfirm;

            /**
             * Decodes a MsgValsetConfirm message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgValsetConfirm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgValsetConfirm;

            /**
             * Verifies a MsgValsetConfirm message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgValsetConfirm message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgValsetConfirm
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgValsetConfirm;

            /**
             * Creates a plain object from a MsgValsetConfirm message. Also converts values to other types if specified.
             * @param message MsgValsetConfirm
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgValsetConfirm, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgValsetConfirm to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgValsetConfirmResponse. */
        interface IMsgValsetConfirmResponse {
        }

        /** Represents a MsgValsetConfirmResponse. */
        class MsgValsetConfirmResponse implements IMsgValsetConfirmResponse {

            /**
             * Constructs a new MsgValsetConfirmResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgValsetConfirmResponse);

            /**
             * Encodes the specified MsgValsetConfirmResponse message. Does not implicitly {@link gravity.v1.MsgValsetConfirmResponse.verify|verify} messages.
             * @param message MsgValsetConfirmResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgValsetConfirmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgValsetConfirmResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgValsetConfirmResponse.verify|verify} messages.
             * @param message MsgValsetConfirmResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgValsetConfirmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgValsetConfirmResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgValsetConfirmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgValsetConfirmResponse;

            /**
             * Decodes a MsgValsetConfirmResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgValsetConfirmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgValsetConfirmResponse;

            /**
             * Verifies a MsgValsetConfirmResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgValsetConfirmResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgValsetConfirmResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgValsetConfirmResponse;

            /**
             * Creates a plain object from a MsgValsetConfirmResponse message. Also converts values to other types if specified.
             * @param message MsgValsetConfirmResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgValsetConfirmResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgValsetConfirmResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSendToEth. */
        interface IMsgSendToEth {

            /** MsgSendToEth sender */
            sender?: (string|null);

            /** MsgSendToEth eth_dest */
            eth_dest?: (string|null);

            /** MsgSendToEth amount */
            amount?: (cosmos.base.v1beta1.ICoin|null);

            /** MsgSendToEth bridge_fee */
            bridge_fee?: (cosmos.base.v1beta1.ICoin|null);
        }

        /** Represents a MsgSendToEth. */
        class MsgSendToEth implements IMsgSendToEth {

            /**
             * Constructs a new MsgSendToEth.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSendToEth);

            /** MsgSendToEth sender. */
            public sender: string;

            /** MsgSendToEth eth_dest. */
            public eth_dest: string;

            /** MsgSendToEth amount. */
            public amount?: (cosmos.base.v1beta1.ICoin|null);

            /** MsgSendToEth bridge_fee. */
            public bridge_fee?: (cosmos.base.v1beta1.ICoin|null);

            /**
             * Encodes the specified MsgSendToEth message. Does not implicitly {@link gravity.v1.MsgSendToEth.verify|verify} messages.
             * @param message MsgSendToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSendToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSendToEth message, length delimited. Does not implicitly {@link gravity.v1.MsgSendToEth.verify|verify} messages.
             * @param message MsgSendToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSendToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSendToEth message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSendToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSendToEth;

            /**
             * Decodes a MsgSendToEth message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSendToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSendToEth;

            /**
             * Verifies a MsgSendToEth message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSendToEth message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSendToEth
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSendToEth;

            /**
             * Creates a plain object from a MsgSendToEth message. Also converts values to other types if specified.
             * @param message MsgSendToEth
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSendToEth, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSendToEth to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSendToEthResponse. */
        interface IMsgSendToEthResponse {
        }

        /** Represents a MsgSendToEthResponse. */
        class MsgSendToEthResponse implements IMsgSendToEthResponse {

            /**
             * Constructs a new MsgSendToEthResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSendToEthResponse);

            /**
             * Encodes the specified MsgSendToEthResponse message. Does not implicitly {@link gravity.v1.MsgSendToEthResponse.verify|verify} messages.
             * @param message MsgSendToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSendToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSendToEthResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgSendToEthResponse.verify|verify} messages.
             * @param message MsgSendToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSendToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSendToEthResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSendToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSendToEthResponse;

            /**
             * Decodes a MsgSendToEthResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSendToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSendToEthResponse;

            /**
             * Verifies a MsgSendToEthResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSendToEthResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSendToEthResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSendToEthResponse;

            /**
             * Creates a plain object from a MsgSendToEthResponse message. Also converts values to other types if specified.
             * @param message MsgSendToEthResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSendToEthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSendToEthResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetMinFeeTransferToEth. */
        interface IMsgSetMinFeeTransferToEth {

            /** MsgSetMinFeeTransferToEth sender */
            sender?: (string|null);

            /** MsgSetMinFeeTransferToEth fee */
            fee?: (string|null);
        }

        /** Represents a MsgSetMinFeeTransferToEth. */
        class MsgSetMinFeeTransferToEth implements IMsgSetMinFeeTransferToEth {

            /**
             * Constructs a new MsgSetMinFeeTransferToEth.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSetMinFeeTransferToEth);

            /** MsgSetMinFeeTransferToEth sender. */
            public sender: string;

            /** MsgSetMinFeeTransferToEth fee. */
            public fee: string;

            /**
             * Encodes the specified MsgSetMinFeeTransferToEth message. Does not implicitly {@link gravity.v1.MsgSetMinFeeTransferToEth.verify|verify} messages.
             * @param message MsgSetMinFeeTransferToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSetMinFeeTransferToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSetMinFeeTransferToEth message, length delimited. Does not implicitly {@link gravity.v1.MsgSetMinFeeTransferToEth.verify|verify} messages.
             * @param message MsgSetMinFeeTransferToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSetMinFeeTransferToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSetMinFeeTransferToEth message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSetMinFeeTransferToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSetMinFeeTransferToEth;

            /**
             * Decodes a MsgSetMinFeeTransferToEth message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSetMinFeeTransferToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSetMinFeeTransferToEth;

            /**
             * Verifies a MsgSetMinFeeTransferToEth message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSetMinFeeTransferToEth message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSetMinFeeTransferToEth
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSetMinFeeTransferToEth;

            /**
             * Creates a plain object from a MsgSetMinFeeTransferToEth message. Also converts values to other types if specified.
             * @param message MsgSetMinFeeTransferToEth
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSetMinFeeTransferToEth, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSetMinFeeTransferToEth to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetMinFeeTransferToEthResponse. */
        interface IMsgSetMinFeeTransferToEthResponse {
        }

        /** Represents a MsgSetMinFeeTransferToEthResponse. */
        class MsgSetMinFeeTransferToEthResponse implements IMsgSetMinFeeTransferToEthResponse {

            /**
             * Constructs a new MsgSetMinFeeTransferToEthResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSetMinFeeTransferToEthResponse);

            /**
             * Encodes the specified MsgSetMinFeeTransferToEthResponse message. Does not implicitly {@link gravity.v1.MsgSetMinFeeTransferToEthResponse.verify|verify} messages.
             * @param message MsgSetMinFeeTransferToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSetMinFeeTransferToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSetMinFeeTransferToEthResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgSetMinFeeTransferToEthResponse.verify|verify} messages.
             * @param message MsgSetMinFeeTransferToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSetMinFeeTransferToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSetMinFeeTransferToEthResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSetMinFeeTransferToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSetMinFeeTransferToEthResponse;

            /**
             * Decodes a MsgSetMinFeeTransferToEthResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSetMinFeeTransferToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSetMinFeeTransferToEthResponse;

            /**
             * Verifies a MsgSetMinFeeTransferToEthResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSetMinFeeTransferToEthResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSetMinFeeTransferToEthResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSetMinFeeTransferToEthResponse;

            /**
             * Creates a plain object from a MsgSetMinFeeTransferToEthResponse message. Also converts values to other types if specified.
             * @param message MsgSetMinFeeTransferToEthResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSetMinFeeTransferToEthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSetMinFeeTransferToEthResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgRequestBatch. */
        interface IMsgRequestBatch {

            /** MsgRequestBatch sender */
            sender?: (string|null);

            /** MsgRequestBatch denom */
            denom?: (string|null);
        }

        /** Represents a MsgRequestBatch. */
        class MsgRequestBatch implements IMsgRequestBatch {

            /**
             * Constructs a new MsgRequestBatch.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgRequestBatch);

            /** MsgRequestBatch sender. */
            public sender: string;

            /** MsgRequestBatch denom. */
            public denom: string;

            /**
             * Encodes the specified MsgRequestBatch message. Does not implicitly {@link gravity.v1.MsgRequestBatch.verify|verify} messages.
             * @param message MsgRequestBatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgRequestBatch, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgRequestBatch message, length delimited. Does not implicitly {@link gravity.v1.MsgRequestBatch.verify|verify} messages.
             * @param message MsgRequestBatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgRequestBatch, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgRequestBatch message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgRequestBatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgRequestBatch;

            /**
             * Decodes a MsgRequestBatch message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgRequestBatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgRequestBatch;

            /**
             * Verifies a MsgRequestBatch message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgRequestBatch message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgRequestBatch
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgRequestBatch;

            /**
             * Creates a plain object from a MsgRequestBatch message. Also converts values to other types if specified.
             * @param message MsgRequestBatch
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgRequestBatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgRequestBatch to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgRequestBatchResponse. */
        interface IMsgRequestBatchResponse {
        }

        /** Represents a MsgRequestBatchResponse. */
        class MsgRequestBatchResponse implements IMsgRequestBatchResponse {

            /**
             * Constructs a new MsgRequestBatchResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgRequestBatchResponse);

            /**
             * Encodes the specified MsgRequestBatchResponse message. Does not implicitly {@link gravity.v1.MsgRequestBatchResponse.verify|verify} messages.
             * @param message MsgRequestBatchResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgRequestBatchResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgRequestBatchResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgRequestBatchResponse.verify|verify} messages.
             * @param message MsgRequestBatchResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgRequestBatchResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgRequestBatchResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgRequestBatchResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgRequestBatchResponse;

            /**
             * Decodes a MsgRequestBatchResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgRequestBatchResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgRequestBatchResponse;

            /**
             * Verifies a MsgRequestBatchResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgRequestBatchResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgRequestBatchResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgRequestBatchResponse;

            /**
             * Creates a plain object from a MsgRequestBatchResponse message. Also converts values to other types if specified.
             * @param message MsgRequestBatchResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgRequestBatchResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgRequestBatchResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgConfirmBatch. */
        interface IMsgConfirmBatch {

            /** MsgConfirmBatch nonce */
            nonce?: (Long|null);

            /** MsgConfirmBatch token_contract */
            token_contract?: (string|null);

            /** MsgConfirmBatch eth_signer */
            eth_signer?: (string|null);

            /** MsgConfirmBatch orchestrator */
            orchestrator?: (string|null);

            /** MsgConfirmBatch signature */
            signature?: (string|null);
        }

        /** Represents a MsgConfirmBatch. */
        class MsgConfirmBatch implements IMsgConfirmBatch {

            /**
             * Constructs a new MsgConfirmBatch.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgConfirmBatch);

            /** MsgConfirmBatch nonce. */
            public nonce: Long;

            /** MsgConfirmBatch token_contract. */
            public token_contract: string;

            /** MsgConfirmBatch eth_signer. */
            public eth_signer: string;

            /** MsgConfirmBatch orchestrator. */
            public orchestrator: string;

            /** MsgConfirmBatch signature. */
            public signature: string;

            /**
             * Encodes the specified MsgConfirmBatch message. Does not implicitly {@link gravity.v1.MsgConfirmBatch.verify|verify} messages.
             * @param message MsgConfirmBatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgConfirmBatch, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgConfirmBatch message, length delimited. Does not implicitly {@link gravity.v1.MsgConfirmBatch.verify|verify} messages.
             * @param message MsgConfirmBatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgConfirmBatch, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgConfirmBatch message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgConfirmBatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgConfirmBatch;

            /**
             * Decodes a MsgConfirmBatch message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgConfirmBatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgConfirmBatch;

            /**
             * Verifies a MsgConfirmBatch message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgConfirmBatch message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgConfirmBatch
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgConfirmBatch;

            /**
             * Creates a plain object from a MsgConfirmBatch message. Also converts values to other types if specified.
             * @param message MsgConfirmBatch
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgConfirmBatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgConfirmBatch to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgConfirmBatchResponse. */
        interface IMsgConfirmBatchResponse {
        }

        /** Represents a MsgConfirmBatchResponse. */
        class MsgConfirmBatchResponse implements IMsgConfirmBatchResponse {

            /**
             * Constructs a new MsgConfirmBatchResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgConfirmBatchResponse);

            /**
             * Encodes the specified MsgConfirmBatchResponse message. Does not implicitly {@link gravity.v1.MsgConfirmBatchResponse.verify|verify} messages.
             * @param message MsgConfirmBatchResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgConfirmBatchResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgConfirmBatchResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgConfirmBatchResponse.verify|verify} messages.
             * @param message MsgConfirmBatchResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgConfirmBatchResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgConfirmBatchResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgConfirmBatchResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgConfirmBatchResponse;

            /**
             * Decodes a MsgConfirmBatchResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgConfirmBatchResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgConfirmBatchResponse;

            /**
             * Verifies a MsgConfirmBatchResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgConfirmBatchResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgConfirmBatchResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgConfirmBatchResponse;

            /**
             * Creates a plain object from a MsgConfirmBatchResponse message. Also converts values to other types if specified.
             * @param message MsgConfirmBatchResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgConfirmBatchResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgConfirmBatchResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgConfirmLogicCall. */
        interface IMsgConfirmLogicCall {

            /** MsgConfirmLogicCall invalidation_id */
            invalidation_id?: (string|null);

            /** MsgConfirmLogicCall invalidation_nonce */
            invalidation_nonce?: (Long|null);

            /** MsgConfirmLogicCall eth_signer */
            eth_signer?: (string|null);

            /** MsgConfirmLogicCall orchestrator */
            orchestrator?: (string|null);

            /** MsgConfirmLogicCall signature */
            signature?: (string|null);
        }

        /** Represents a MsgConfirmLogicCall. */
        class MsgConfirmLogicCall implements IMsgConfirmLogicCall {

            /**
             * Constructs a new MsgConfirmLogicCall.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgConfirmLogicCall);

            /** MsgConfirmLogicCall invalidation_id. */
            public invalidation_id: string;

            /** MsgConfirmLogicCall invalidation_nonce. */
            public invalidation_nonce: Long;

            /** MsgConfirmLogicCall eth_signer. */
            public eth_signer: string;

            /** MsgConfirmLogicCall orchestrator. */
            public orchestrator: string;

            /** MsgConfirmLogicCall signature. */
            public signature: string;

            /**
             * Encodes the specified MsgConfirmLogicCall message. Does not implicitly {@link gravity.v1.MsgConfirmLogicCall.verify|verify} messages.
             * @param message MsgConfirmLogicCall message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgConfirmLogicCall, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgConfirmLogicCall message, length delimited. Does not implicitly {@link gravity.v1.MsgConfirmLogicCall.verify|verify} messages.
             * @param message MsgConfirmLogicCall message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgConfirmLogicCall, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgConfirmLogicCall message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgConfirmLogicCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgConfirmLogicCall;

            /**
             * Decodes a MsgConfirmLogicCall message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgConfirmLogicCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgConfirmLogicCall;

            /**
             * Verifies a MsgConfirmLogicCall message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgConfirmLogicCall message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgConfirmLogicCall
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgConfirmLogicCall;

            /**
             * Creates a plain object from a MsgConfirmLogicCall message. Also converts values to other types if specified.
             * @param message MsgConfirmLogicCall
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgConfirmLogicCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgConfirmLogicCall to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgConfirmLogicCallResponse. */
        interface IMsgConfirmLogicCallResponse {
        }

        /** Represents a MsgConfirmLogicCallResponse. */
        class MsgConfirmLogicCallResponse implements IMsgConfirmLogicCallResponse {

            /**
             * Constructs a new MsgConfirmLogicCallResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgConfirmLogicCallResponse);

            /**
             * Encodes the specified MsgConfirmLogicCallResponse message. Does not implicitly {@link gravity.v1.MsgConfirmLogicCallResponse.verify|verify} messages.
             * @param message MsgConfirmLogicCallResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgConfirmLogicCallResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgConfirmLogicCallResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgConfirmLogicCallResponse.verify|verify} messages.
             * @param message MsgConfirmLogicCallResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgConfirmLogicCallResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgConfirmLogicCallResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgConfirmLogicCallResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgConfirmLogicCallResponse;

            /**
             * Decodes a MsgConfirmLogicCallResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgConfirmLogicCallResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgConfirmLogicCallResponse;

            /**
             * Verifies a MsgConfirmLogicCallResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgConfirmLogicCallResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgConfirmLogicCallResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgConfirmLogicCallResponse;

            /**
             * Creates a plain object from a MsgConfirmLogicCallResponse message. Also converts values to other types if specified.
             * @param message MsgConfirmLogicCallResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgConfirmLogicCallResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgConfirmLogicCallResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSendToCosmosClaim. */
        interface IMsgSendToCosmosClaim {

            /** MsgSendToCosmosClaim event_nonce */
            event_nonce?: (Long|null);

            /** MsgSendToCosmosClaim block_height */
            block_height?: (Long|null);

            /** MsgSendToCosmosClaim token_contract */
            token_contract?: (string|null);

            /** MsgSendToCosmosClaim amount */
            amount?: (string|null);

            /** MsgSendToCosmosClaim ethereum_sender */
            ethereum_sender?: (string|null);

            /** MsgSendToCosmosClaim cosmos_receiver */
            cosmos_receiver?: (string|null);

            /** MsgSendToCosmosClaim orchestrator */
            orchestrator?: (string|null);
        }

        /** Represents a MsgSendToCosmosClaim. */
        class MsgSendToCosmosClaim implements IMsgSendToCosmosClaim {

            /**
             * Constructs a new MsgSendToCosmosClaim.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSendToCosmosClaim);

            /** MsgSendToCosmosClaim event_nonce. */
            public event_nonce: Long;

            /** MsgSendToCosmosClaim block_height. */
            public block_height: Long;

            /** MsgSendToCosmosClaim token_contract. */
            public token_contract: string;

            /** MsgSendToCosmosClaim amount. */
            public amount: string;

            /** MsgSendToCosmosClaim ethereum_sender. */
            public ethereum_sender: string;

            /** MsgSendToCosmosClaim cosmos_receiver. */
            public cosmos_receiver: string;

            /** MsgSendToCosmosClaim orchestrator. */
            public orchestrator: string;

            /**
             * Encodes the specified MsgSendToCosmosClaim message. Does not implicitly {@link gravity.v1.MsgSendToCosmosClaim.verify|verify} messages.
             * @param message MsgSendToCosmosClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSendToCosmosClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSendToCosmosClaim message, length delimited. Does not implicitly {@link gravity.v1.MsgSendToCosmosClaim.verify|verify} messages.
             * @param message MsgSendToCosmosClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSendToCosmosClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSendToCosmosClaim message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSendToCosmosClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSendToCosmosClaim;

            /**
             * Decodes a MsgSendToCosmosClaim message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSendToCosmosClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSendToCosmosClaim;

            /**
             * Verifies a MsgSendToCosmosClaim message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSendToCosmosClaim message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSendToCosmosClaim
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSendToCosmosClaim;

            /**
             * Creates a plain object from a MsgSendToCosmosClaim message. Also converts values to other types if specified.
             * @param message MsgSendToCosmosClaim
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSendToCosmosClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSendToCosmosClaim to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSendToCosmosClaimResponse. */
        interface IMsgSendToCosmosClaimResponse {
        }

        /** Represents a MsgSendToCosmosClaimResponse. */
        class MsgSendToCosmosClaimResponse implements IMsgSendToCosmosClaimResponse {

            /**
             * Constructs a new MsgSendToCosmosClaimResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSendToCosmosClaimResponse);

            /**
             * Encodes the specified MsgSendToCosmosClaimResponse message. Does not implicitly {@link gravity.v1.MsgSendToCosmosClaimResponse.verify|verify} messages.
             * @param message MsgSendToCosmosClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSendToCosmosClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSendToCosmosClaimResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgSendToCosmosClaimResponse.verify|verify} messages.
             * @param message MsgSendToCosmosClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSendToCosmosClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSendToCosmosClaimResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSendToCosmosClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSendToCosmosClaimResponse;

            /**
             * Decodes a MsgSendToCosmosClaimResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSendToCosmosClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSendToCosmosClaimResponse;

            /**
             * Verifies a MsgSendToCosmosClaimResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSendToCosmosClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSendToCosmosClaimResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSendToCosmosClaimResponse;

            /**
             * Creates a plain object from a MsgSendToCosmosClaimResponse message. Also converts values to other types if specified.
             * @param message MsgSendToCosmosClaimResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSendToCosmosClaimResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSendToCosmosClaimResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgBatchSendToEthClaim. */
        interface IMsgBatchSendToEthClaim {

            /** MsgBatchSendToEthClaim event_nonce */
            event_nonce?: (Long|null);

            /** MsgBatchSendToEthClaim block_height */
            block_height?: (Long|null);

            /** MsgBatchSendToEthClaim batch_nonce */
            batch_nonce?: (Long|null);

            /** MsgBatchSendToEthClaim token_contract */
            token_contract?: (string|null);

            /** MsgBatchSendToEthClaim orchestrator */
            orchestrator?: (string|null);
        }

        /** Represents a MsgBatchSendToEthClaim. */
        class MsgBatchSendToEthClaim implements IMsgBatchSendToEthClaim {

            /**
             * Constructs a new MsgBatchSendToEthClaim.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgBatchSendToEthClaim);

            /** MsgBatchSendToEthClaim event_nonce. */
            public event_nonce: Long;

            /** MsgBatchSendToEthClaim block_height. */
            public block_height: Long;

            /** MsgBatchSendToEthClaim batch_nonce. */
            public batch_nonce: Long;

            /** MsgBatchSendToEthClaim token_contract. */
            public token_contract: string;

            /** MsgBatchSendToEthClaim orchestrator. */
            public orchestrator: string;

            /**
             * Encodes the specified MsgBatchSendToEthClaim message. Does not implicitly {@link gravity.v1.MsgBatchSendToEthClaim.verify|verify} messages.
             * @param message MsgBatchSendToEthClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgBatchSendToEthClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgBatchSendToEthClaim message, length delimited. Does not implicitly {@link gravity.v1.MsgBatchSendToEthClaim.verify|verify} messages.
             * @param message MsgBatchSendToEthClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgBatchSendToEthClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgBatchSendToEthClaim message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgBatchSendToEthClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgBatchSendToEthClaim;

            /**
             * Decodes a MsgBatchSendToEthClaim message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgBatchSendToEthClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgBatchSendToEthClaim;

            /**
             * Verifies a MsgBatchSendToEthClaim message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgBatchSendToEthClaim message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgBatchSendToEthClaim
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgBatchSendToEthClaim;

            /**
             * Creates a plain object from a MsgBatchSendToEthClaim message. Also converts values to other types if specified.
             * @param message MsgBatchSendToEthClaim
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgBatchSendToEthClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgBatchSendToEthClaim to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgBatchSendToEthClaimResponse. */
        interface IMsgBatchSendToEthClaimResponse {
        }

        /** Represents a MsgBatchSendToEthClaimResponse. */
        class MsgBatchSendToEthClaimResponse implements IMsgBatchSendToEthClaimResponse {

            /**
             * Constructs a new MsgBatchSendToEthClaimResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgBatchSendToEthClaimResponse);

            /**
             * Encodes the specified MsgBatchSendToEthClaimResponse message. Does not implicitly {@link gravity.v1.MsgBatchSendToEthClaimResponse.verify|verify} messages.
             * @param message MsgBatchSendToEthClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgBatchSendToEthClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgBatchSendToEthClaimResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgBatchSendToEthClaimResponse.verify|verify} messages.
             * @param message MsgBatchSendToEthClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgBatchSendToEthClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgBatchSendToEthClaimResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgBatchSendToEthClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgBatchSendToEthClaimResponse;

            /**
             * Decodes a MsgBatchSendToEthClaimResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgBatchSendToEthClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgBatchSendToEthClaimResponse;

            /**
             * Verifies a MsgBatchSendToEthClaimResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgBatchSendToEthClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgBatchSendToEthClaimResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgBatchSendToEthClaimResponse;

            /**
             * Creates a plain object from a MsgBatchSendToEthClaimResponse message. Also converts values to other types if specified.
             * @param message MsgBatchSendToEthClaimResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgBatchSendToEthClaimResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgBatchSendToEthClaimResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgERC20DeployedClaim. */
        interface IMsgERC20DeployedClaim {

            /** MsgERC20DeployedClaim event_nonce */
            event_nonce?: (Long|null);

            /** MsgERC20DeployedClaim block_height */
            block_height?: (Long|null);

            /** MsgERC20DeployedClaim cosmos_denom */
            cosmos_denom?: (string|null);

            /** MsgERC20DeployedClaim token_contract */
            token_contract?: (string|null);

            /** MsgERC20DeployedClaim name */
            name?: (string|null);

            /** MsgERC20DeployedClaim symbol */
            symbol?: (string|null);

            /** MsgERC20DeployedClaim decimals */
            decimals?: (Long|null);

            /** MsgERC20DeployedClaim orchestrator */
            orchestrator?: (string|null);
        }

        /** Represents a MsgERC20DeployedClaim. */
        class MsgERC20DeployedClaim implements IMsgERC20DeployedClaim {

            /**
             * Constructs a new MsgERC20DeployedClaim.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgERC20DeployedClaim);

            /** MsgERC20DeployedClaim event_nonce. */
            public event_nonce: Long;

            /** MsgERC20DeployedClaim block_height. */
            public block_height: Long;

            /** MsgERC20DeployedClaim cosmos_denom. */
            public cosmos_denom: string;

            /** MsgERC20DeployedClaim token_contract. */
            public token_contract: string;

            /** MsgERC20DeployedClaim name. */
            public name: string;

            /** MsgERC20DeployedClaim symbol. */
            public symbol: string;

            /** MsgERC20DeployedClaim decimals. */
            public decimals: Long;

            /** MsgERC20DeployedClaim orchestrator. */
            public orchestrator: string;

            /**
             * Encodes the specified MsgERC20DeployedClaim message. Does not implicitly {@link gravity.v1.MsgERC20DeployedClaim.verify|verify} messages.
             * @param message MsgERC20DeployedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgERC20DeployedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgERC20DeployedClaim message, length delimited. Does not implicitly {@link gravity.v1.MsgERC20DeployedClaim.verify|verify} messages.
             * @param message MsgERC20DeployedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgERC20DeployedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgERC20DeployedClaim message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgERC20DeployedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgERC20DeployedClaim;

            /**
             * Decodes a MsgERC20DeployedClaim message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgERC20DeployedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgERC20DeployedClaim;

            /**
             * Verifies a MsgERC20DeployedClaim message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgERC20DeployedClaim message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgERC20DeployedClaim
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgERC20DeployedClaim;

            /**
             * Creates a plain object from a MsgERC20DeployedClaim message. Also converts values to other types if specified.
             * @param message MsgERC20DeployedClaim
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgERC20DeployedClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgERC20DeployedClaim to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgERC20DeployedClaimResponse. */
        interface IMsgERC20DeployedClaimResponse {
        }

        /** Represents a MsgERC20DeployedClaimResponse. */
        class MsgERC20DeployedClaimResponse implements IMsgERC20DeployedClaimResponse {

            /**
             * Constructs a new MsgERC20DeployedClaimResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgERC20DeployedClaimResponse);

            /**
             * Encodes the specified MsgERC20DeployedClaimResponse message. Does not implicitly {@link gravity.v1.MsgERC20DeployedClaimResponse.verify|verify} messages.
             * @param message MsgERC20DeployedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgERC20DeployedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgERC20DeployedClaimResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgERC20DeployedClaimResponse.verify|verify} messages.
             * @param message MsgERC20DeployedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgERC20DeployedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgERC20DeployedClaimResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgERC20DeployedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgERC20DeployedClaimResponse;

            /**
             * Decodes a MsgERC20DeployedClaimResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgERC20DeployedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgERC20DeployedClaimResponse;

            /**
             * Verifies a MsgERC20DeployedClaimResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgERC20DeployedClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgERC20DeployedClaimResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgERC20DeployedClaimResponse;

            /**
             * Creates a plain object from a MsgERC20DeployedClaimResponse message. Also converts values to other types if specified.
             * @param message MsgERC20DeployedClaimResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgERC20DeployedClaimResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgERC20DeployedClaimResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgLogicCallExecutedClaim. */
        interface IMsgLogicCallExecutedClaim {

            /** MsgLogicCallExecutedClaim event_nonce */
            event_nonce?: (Long|null);

            /** MsgLogicCallExecutedClaim block_height */
            block_height?: (Long|null);

            /** MsgLogicCallExecutedClaim invalidation_id */
            invalidation_id?: (Uint8Array|null);

            /** MsgLogicCallExecutedClaim invalidation_nonce */
            invalidation_nonce?: (Long|null);

            /** MsgLogicCallExecutedClaim orchestrator */
            orchestrator?: (string|null);
        }

        /** Represents a MsgLogicCallExecutedClaim. */
        class MsgLogicCallExecutedClaim implements IMsgLogicCallExecutedClaim {

            /**
             * Constructs a new MsgLogicCallExecutedClaim.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgLogicCallExecutedClaim);

            /** MsgLogicCallExecutedClaim event_nonce. */
            public event_nonce: Long;

            /** MsgLogicCallExecutedClaim block_height. */
            public block_height: Long;

            /** MsgLogicCallExecutedClaim invalidation_id. */
            public invalidation_id: Uint8Array;

            /** MsgLogicCallExecutedClaim invalidation_nonce. */
            public invalidation_nonce: Long;

            /** MsgLogicCallExecutedClaim orchestrator. */
            public orchestrator: string;

            /**
             * Encodes the specified MsgLogicCallExecutedClaim message. Does not implicitly {@link gravity.v1.MsgLogicCallExecutedClaim.verify|verify} messages.
             * @param message MsgLogicCallExecutedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgLogicCallExecutedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgLogicCallExecutedClaim message, length delimited. Does not implicitly {@link gravity.v1.MsgLogicCallExecutedClaim.verify|verify} messages.
             * @param message MsgLogicCallExecutedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgLogicCallExecutedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgLogicCallExecutedClaim message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgLogicCallExecutedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgLogicCallExecutedClaim;

            /**
             * Decodes a MsgLogicCallExecutedClaim message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgLogicCallExecutedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgLogicCallExecutedClaim;

            /**
             * Verifies a MsgLogicCallExecutedClaim message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgLogicCallExecutedClaim message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgLogicCallExecutedClaim
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgLogicCallExecutedClaim;

            /**
             * Creates a plain object from a MsgLogicCallExecutedClaim message. Also converts values to other types if specified.
             * @param message MsgLogicCallExecutedClaim
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgLogicCallExecutedClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgLogicCallExecutedClaim to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgLogicCallExecutedClaimResponse. */
        interface IMsgLogicCallExecutedClaimResponse {
        }

        /** Represents a MsgLogicCallExecutedClaimResponse. */
        class MsgLogicCallExecutedClaimResponse implements IMsgLogicCallExecutedClaimResponse {

            /**
             * Constructs a new MsgLogicCallExecutedClaimResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgLogicCallExecutedClaimResponse);

            /**
             * Encodes the specified MsgLogicCallExecutedClaimResponse message. Does not implicitly {@link gravity.v1.MsgLogicCallExecutedClaimResponse.verify|verify} messages.
             * @param message MsgLogicCallExecutedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgLogicCallExecutedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgLogicCallExecutedClaimResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgLogicCallExecutedClaimResponse.verify|verify} messages.
             * @param message MsgLogicCallExecutedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgLogicCallExecutedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgLogicCallExecutedClaimResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgLogicCallExecutedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgLogicCallExecutedClaimResponse;

            /**
             * Decodes a MsgLogicCallExecutedClaimResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgLogicCallExecutedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgLogicCallExecutedClaimResponse;

            /**
             * Verifies a MsgLogicCallExecutedClaimResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgLogicCallExecutedClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgLogicCallExecutedClaimResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgLogicCallExecutedClaimResponse;

            /**
             * Creates a plain object from a MsgLogicCallExecutedClaimResponse message. Also converts values to other types if specified.
             * @param message MsgLogicCallExecutedClaimResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgLogicCallExecutedClaimResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgLogicCallExecutedClaimResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgValsetUpdatedClaim. */
        interface IMsgValsetUpdatedClaim {

            /** MsgValsetUpdatedClaim event_nonce */
            event_nonce?: (Long|null);

            /** MsgValsetUpdatedClaim valset_nonce */
            valset_nonce?: (Long|null);

            /** MsgValsetUpdatedClaim block_height */
            block_height?: (Long|null);

            /** MsgValsetUpdatedClaim members */
            members?: (gravity.v1.IBridgeValidator[]|null);

            /** MsgValsetUpdatedClaim reward_amount */
            reward_amount?: (string|null);

            /** MsgValsetUpdatedClaim reward_token */
            reward_token?: (string|null);

            /** MsgValsetUpdatedClaim orchestrator */
            orchestrator?: (string|null);
        }

        /** Represents a MsgValsetUpdatedClaim. */
        class MsgValsetUpdatedClaim implements IMsgValsetUpdatedClaim {

            /**
             * Constructs a new MsgValsetUpdatedClaim.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgValsetUpdatedClaim);

            /** MsgValsetUpdatedClaim event_nonce. */
            public event_nonce: Long;

            /** MsgValsetUpdatedClaim valset_nonce. */
            public valset_nonce: Long;

            /** MsgValsetUpdatedClaim block_height. */
            public block_height: Long;

            /** MsgValsetUpdatedClaim members. */
            public members: gravity.v1.IBridgeValidator[];

            /** MsgValsetUpdatedClaim reward_amount. */
            public reward_amount: string;

            /** MsgValsetUpdatedClaim reward_token. */
            public reward_token: string;

            /** MsgValsetUpdatedClaim orchestrator. */
            public orchestrator: string;

            /**
             * Encodes the specified MsgValsetUpdatedClaim message. Does not implicitly {@link gravity.v1.MsgValsetUpdatedClaim.verify|verify} messages.
             * @param message MsgValsetUpdatedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgValsetUpdatedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgValsetUpdatedClaim message, length delimited. Does not implicitly {@link gravity.v1.MsgValsetUpdatedClaim.verify|verify} messages.
             * @param message MsgValsetUpdatedClaim message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgValsetUpdatedClaim, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgValsetUpdatedClaim message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgValsetUpdatedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgValsetUpdatedClaim;

            /**
             * Decodes a MsgValsetUpdatedClaim message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgValsetUpdatedClaim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgValsetUpdatedClaim;

            /**
             * Verifies a MsgValsetUpdatedClaim message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgValsetUpdatedClaim message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgValsetUpdatedClaim
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgValsetUpdatedClaim;

            /**
             * Creates a plain object from a MsgValsetUpdatedClaim message. Also converts values to other types if specified.
             * @param message MsgValsetUpdatedClaim
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgValsetUpdatedClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgValsetUpdatedClaim to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgValsetUpdatedClaimResponse. */
        interface IMsgValsetUpdatedClaimResponse {
        }

        /** Represents a MsgValsetUpdatedClaimResponse. */
        class MsgValsetUpdatedClaimResponse implements IMsgValsetUpdatedClaimResponse {

            /**
             * Constructs a new MsgValsetUpdatedClaimResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgValsetUpdatedClaimResponse);

            /**
             * Encodes the specified MsgValsetUpdatedClaimResponse message. Does not implicitly {@link gravity.v1.MsgValsetUpdatedClaimResponse.verify|verify} messages.
             * @param message MsgValsetUpdatedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgValsetUpdatedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgValsetUpdatedClaimResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgValsetUpdatedClaimResponse.verify|verify} messages.
             * @param message MsgValsetUpdatedClaimResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgValsetUpdatedClaimResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgValsetUpdatedClaimResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgValsetUpdatedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgValsetUpdatedClaimResponse;

            /**
             * Decodes a MsgValsetUpdatedClaimResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgValsetUpdatedClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgValsetUpdatedClaimResponse;

            /**
             * Verifies a MsgValsetUpdatedClaimResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgValsetUpdatedClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgValsetUpdatedClaimResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgValsetUpdatedClaimResponse;

            /**
             * Creates a plain object from a MsgValsetUpdatedClaimResponse message. Also converts values to other types if specified.
             * @param message MsgValsetUpdatedClaimResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgValsetUpdatedClaimResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgValsetUpdatedClaimResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgCancelSendToEth. */
        interface IMsgCancelSendToEth {

            /** MsgCancelSendToEth transaction_id */
            transaction_id?: (Long|null);

            /** MsgCancelSendToEth sender */
            sender?: (string|null);
        }

        /** Represents a MsgCancelSendToEth. */
        class MsgCancelSendToEth implements IMsgCancelSendToEth {

            /**
             * Constructs a new MsgCancelSendToEth.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgCancelSendToEth);

            /** MsgCancelSendToEth transaction_id. */
            public transaction_id: Long;

            /** MsgCancelSendToEth sender. */
            public sender: string;

            /**
             * Encodes the specified MsgCancelSendToEth message. Does not implicitly {@link gravity.v1.MsgCancelSendToEth.verify|verify} messages.
             * @param message MsgCancelSendToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgCancelSendToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgCancelSendToEth message, length delimited. Does not implicitly {@link gravity.v1.MsgCancelSendToEth.verify|verify} messages.
             * @param message MsgCancelSendToEth message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgCancelSendToEth, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgCancelSendToEth message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgCancelSendToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgCancelSendToEth;

            /**
             * Decodes a MsgCancelSendToEth message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgCancelSendToEth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgCancelSendToEth;

            /**
             * Verifies a MsgCancelSendToEth message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgCancelSendToEth message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgCancelSendToEth
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgCancelSendToEth;

            /**
             * Creates a plain object from a MsgCancelSendToEth message. Also converts values to other types if specified.
             * @param message MsgCancelSendToEth
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgCancelSendToEth, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgCancelSendToEth to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgCancelSendToEthResponse. */
        interface IMsgCancelSendToEthResponse {
        }

        /** Represents a MsgCancelSendToEthResponse. */
        class MsgCancelSendToEthResponse implements IMsgCancelSendToEthResponse {

            /**
             * Constructs a new MsgCancelSendToEthResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgCancelSendToEthResponse);

            /**
             * Encodes the specified MsgCancelSendToEthResponse message. Does not implicitly {@link gravity.v1.MsgCancelSendToEthResponse.verify|verify} messages.
             * @param message MsgCancelSendToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgCancelSendToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgCancelSendToEthResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgCancelSendToEthResponse.verify|verify} messages.
             * @param message MsgCancelSendToEthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgCancelSendToEthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgCancelSendToEthResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgCancelSendToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgCancelSendToEthResponse;

            /**
             * Decodes a MsgCancelSendToEthResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgCancelSendToEthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgCancelSendToEthResponse;

            /**
             * Verifies a MsgCancelSendToEthResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgCancelSendToEthResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgCancelSendToEthResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgCancelSendToEthResponse;

            /**
             * Creates a plain object from a MsgCancelSendToEthResponse message. Also converts values to other types if specified.
             * @param message MsgCancelSendToEthResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgCancelSendToEthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgCancelSendToEthResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSubmitBadSignatureEvidence. */
        interface IMsgSubmitBadSignatureEvidence {

            /** MsgSubmitBadSignatureEvidence subject */
            subject?: (google.protobuf.IAny|null);

            /** MsgSubmitBadSignatureEvidence signature */
            signature?: (string|null);

            /** MsgSubmitBadSignatureEvidence sender */
            sender?: (string|null);
        }

        /** Represents a MsgSubmitBadSignatureEvidence. */
        class MsgSubmitBadSignatureEvidence implements IMsgSubmitBadSignatureEvidence {

            /**
             * Constructs a new MsgSubmitBadSignatureEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSubmitBadSignatureEvidence);

            /** MsgSubmitBadSignatureEvidence subject. */
            public subject?: (google.protobuf.IAny|null);

            /** MsgSubmitBadSignatureEvidence signature. */
            public signature: string;

            /** MsgSubmitBadSignatureEvidence sender. */
            public sender: string;

            /**
             * Encodes the specified MsgSubmitBadSignatureEvidence message. Does not implicitly {@link gravity.v1.MsgSubmitBadSignatureEvidence.verify|verify} messages.
             * @param message MsgSubmitBadSignatureEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSubmitBadSignatureEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSubmitBadSignatureEvidence message, length delimited. Does not implicitly {@link gravity.v1.MsgSubmitBadSignatureEvidence.verify|verify} messages.
             * @param message MsgSubmitBadSignatureEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSubmitBadSignatureEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSubmitBadSignatureEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSubmitBadSignatureEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSubmitBadSignatureEvidence;

            /**
             * Decodes a MsgSubmitBadSignatureEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSubmitBadSignatureEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSubmitBadSignatureEvidence;

            /**
             * Verifies a MsgSubmitBadSignatureEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSubmitBadSignatureEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSubmitBadSignatureEvidence
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSubmitBadSignatureEvidence;

            /**
             * Creates a plain object from a MsgSubmitBadSignatureEvidence message. Also converts values to other types if specified.
             * @param message MsgSubmitBadSignatureEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSubmitBadSignatureEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSubmitBadSignatureEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSubmitBadSignatureEvidenceResponse. */
        interface IMsgSubmitBadSignatureEvidenceResponse {
        }

        /** Represents a MsgSubmitBadSignatureEvidenceResponse. */
        class MsgSubmitBadSignatureEvidenceResponse implements IMsgSubmitBadSignatureEvidenceResponse {

            /**
             * Constructs a new MsgSubmitBadSignatureEvidenceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gravity.v1.IMsgSubmitBadSignatureEvidenceResponse);

            /**
             * Encodes the specified MsgSubmitBadSignatureEvidenceResponse message. Does not implicitly {@link gravity.v1.MsgSubmitBadSignatureEvidenceResponse.verify|verify} messages.
             * @param message MsgSubmitBadSignatureEvidenceResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gravity.v1.IMsgSubmitBadSignatureEvidenceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgSubmitBadSignatureEvidenceResponse message, length delimited. Does not implicitly {@link gravity.v1.MsgSubmitBadSignatureEvidenceResponse.verify|verify} messages.
             * @param message MsgSubmitBadSignatureEvidenceResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gravity.v1.IMsgSubmitBadSignatureEvidenceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgSubmitBadSignatureEvidenceResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgSubmitBadSignatureEvidenceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gravity.v1.MsgSubmitBadSignatureEvidenceResponse;

            /**
             * Decodes a MsgSubmitBadSignatureEvidenceResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgSubmitBadSignatureEvidenceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gravity.v1.MsgSubmitBadSignatureEvidenceResponse;

            /**
             * Verifies a MsgSubmitBadSignatureEvidenceResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgSubmitBadSignatureEvidenceResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgSubmitBadSignatureEvidenceResponse
             */
            public static fromObject(object: { [k: string]: any }): gravity.v1.MsgSubmitBadSignatureEvidenceResponse;

            /**
             * Creates a plain object from a MsgSubmitBadSignatureEvidenceResponse message. Also converts values to other types if specified.
             * @param message MsgSubmitBadSignatureEvidenceResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gravity.v1.MsgSubmitBadSignatureEvidenceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgSubmitBadSignatureEvidenceResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace cosmos. */
export namespace cosmos {

    /** Namespace base. */
    namespace base {

        /** Namespace abci. */
        namespace abci {

            /** Namespace v1beta1. */
            namespace v1beta1 {

                /** Properties of a TxResponse. */
                interface ITxResponse {

                    /** TxResponse height */
                    height?: (Long|null);

                    /** TxResponse txhash */
                    txhash?: (string|null);

                    /** TxResponse codespace */
                    codespace?: (string|null);

                    /** TxResponse code */
                    code?: (number|null);

                    /** TxResponse data */
                    data?: (string|null);

                    /** TxResponse raw_log */
                    raw_log?: (string|null);

                    /** TxResponse logs */
                    logs?: (cosmos.base.abci.v1beta1.IABCIMessageLog[]|null);

                    /** TxResponse info */
                    info?: (string|null);

                    /** TxResponse gas_wanted */
                    gas_wanted?: (Long|null);

                    /** TxResponse gas_used */
                    gas_used?: (Long|null);

                    /** TxResponse tx */
                    tx?: (google.protobuf.IAny|null);

                    /** TxResponse timestamp */
                    timestamp?: (string|null);
                }

                /** Represents a TxResponse. */
                class TxResponse implements ITxResponse {

                    /**
                     * Constructs a new TxResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.ITxResponse);

                    /** TxResponse height. */
                    public height: Long;

                    /** TxResponse txhash. */
                    public txhash: string;

                    /** TxResponse codespace. */
                    public codespace: string;

                    /** TxResponse code. */
                    public code: number;

                    /** TxResponse data. */
                    public data: string;

                    /** TxResponse raw_log. */
                    public raw_log: string;

                    /** TxResponse logs. */
                    public logs: cosmos.base.abci.v1beta1.IABCIMessageLog[];

                    /** TxResponse info. */
                    public info: string;

                    /** TxResponse gas_wanted. */
                    public gas_wanted: Long;

                    /** TxResponse gas_used. */
                    public gas_used: Long;

                    /** TxResponse tx. */
                    public tx?: (google.protobuf.IAny|null);

                    /** TxResponse timestamp. */
                    public timestamp: string;

                    /**
                     * Encodes the specified TxResponse message. Does not implicitly {@link cosmos.base.abci.v1beta1.TxResponse.verify|verify} messages.
                     * @param message TxResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.ITxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TxResponse message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.TxResponse.verify|verify} messages.
                     * @param message TxResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.ITxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TxResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TxResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.TxResponse;

                    /**
                     * Decodes a TxResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TxResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.TxResponse;

                    /**
                     * Verifies a TxResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TxResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TxResponse
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.TxResponse;

                    /**
                     * Creates a plain object from a TxResponse message. Also converts values to other types if specified.
                     * @param message TxResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.TxResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TxResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ABCIMessageLog. */
                interface IABCIMessageLog {

                    /** ABCIMessageLog msg_index */
                    msg_index?: (number|null);

                    /** ABCIMessageLog log */
                    log?: (string|null);

                    /** ABCIMessageLog events */
                    events?: (cosmos.base.abci.v1beta1.IStringEvent[]|null);
                }

                /** Represents a ABCIMessageLog. */
                class ABCIMessageLog implements IABCIMessageLog {

                    /**
                     * Constructs a new ABCIMessageLog.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IABCIMessageLog);

                    /** ABCIMessageLog msg_index. */
                    public msg_index: number;

                    /** ABCIMessageLog log. */
                    public log: string;

                    /** ABCIMessageLog events. */
                    public events: cosmos.base.abci.v1beta1.IStringEvent[];

                    /**
                     * Encodes the specified ABCIMessageLog message. Does not implicitly {@link cosmos.base.abci.v1beta1.ABCIMessageLog.verify|verify} messages.
                     * @param message ABCIMessageLog message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IABCIMessageLog, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ABCIMessageLog message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.ABCIMessageLog.verify|verify} messages.
                     * @param message ABCIMessageLog message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IABCIMessageLog, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ABCIMessageLog message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ABCIMessageLog
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.ABCIMessageLog;

                    /**
                     * Decodes a ABCIMessageLog message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ABCIMessageLog
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.ABCIMessageLog;

                    /**
                     * Verifies a ABCIMessageLog message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ABCIMessageLog message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ABCIMessageLog
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.ABCIMessageLog;

                    /**
                     * Creates a plain object from a ABCIMessageLog message. Also converts values to other types if specified.
                     * @param message ABCIMessageLog
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.ABCIMessageLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ABCIMessageLog to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a StringEvent. */
                interface IStringEvent {

                    /** StringEvent type */
                    type?: (string|null);

                    /** StringEvent attributes */
                    attributes?: (cosmos.base.abci.v1beta1.IAttribute[]|null);
                }

                /** Represents a StringEvent. */
                class StringEvent implements IStringEvent {

                    /**
                     * Constructs a new StringEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IStringEvent);

                    /** StringEvent type. */
                    public type: string;

                    /** StringEvent attributes. */
                    public attributes: cosmos.base.abci.v1beta1.IAttribute[];

                    /**
                     * Encodes the specified StringEvent message. Does not implicitly {@link cosmos.base.abci.v1beta1.StringEvent.verify|verify} messages.
                     * @param message StringEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IStringEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified StringEvent message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.StringEvent.verify|verify} messages.
                     * @param message StringEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IStringEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a StringEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns StringEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.StringEvent;

                    /**
                     * Decodes a StringEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns StringEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.StringEvent;

                    /**
                     * Verifies a StringEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a StringEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns StringEvent
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.StringEvent;

                    /**
                     * Creates a plain object from a StringEvent message. Also converts values to other types if specified.
                     * @param message StringEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.StringEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this StringEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Attribute. */
                interface IAttribute {

                    /** Attribute key */
                    key?: (string|null);

                    /** Attribute value */
                    value?: (string|null);
                }

                /** Represents an Attribute. */
                class Attribute implements IAttribute {

                    /**
                     * Constructs a new Attribute.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IAttribute);

                    /** Attribute key. */
                    public key: string;

                    /** Attribute value. */
                    public value: string;

                    /**
                     * Encodes the specified Attribute message. Does not implicitly {@link cosmos.base.abci.v1beta1.Attribute.verify|verify} messages.
                     * @param message Attribute message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Attribute message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.Attribute.verify|verify} messages.
                     * @param message Attribute message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Attribute message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Attribute
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.Attribute;

                    /**
                     * Decodes an Attribute message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Attribute
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.Attribute;

                    /**
                     * Verifies an Attribute message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Attribute message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Attribute
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.Attribute;

                    /**
                     * Creates a plain object from an Attribute message. Also converts values to other types if specified.
                     * @param message Attribute
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.Attribute, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Attribute to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GasInfo. */
                interface IGasInfo {

                    /** GasInfo gas_wanted */
                    gas_wanted?: (Long|null);

                    /** GasInfo gas_used */
                    gas_used?: (Long|null);
                }

                /** Represents a GasInfo. */
                class GasInfo implements IGasInfo {

                    /**
                     * Constructs a new GasInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IGasInfo);

                    /** GasInfo gas_wanted. */
                    public gas_wanted: Long;

                    /** GasInfo gas_used. */
                    public gas_used: Long;

                    /**
                     * Encodes the specified GasInfo message. Does not implicitly {@link cosmos.base.abci.v1beta1.GasInfo.verify|verify} messages.
                     * @param message GasInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IGasInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GasInfo message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.GasInfo.verify|verify} messages.
                     * @param message GasInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IGasInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GasInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GasInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.GasInfo;

                    /**
                     * Decodes a GasInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GasInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.GasInfo;

                    /**
                     * Verifies a GasInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GasInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GasInfo
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.GasInfo;

                    /**
                     * Creates a plain object from a GasInfo message. Also converts values to other types if specified.
                     * @param message GasInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.GasInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GasInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Result. */
                interface IResult {

                    /** Result data */
                    data?: (Uint8Array|null);

                    /** Result log */
                    log?: (string|null);

                    /** Result events */
                    events?: (tendermint.abci.IEvent[]|null);
                }

                /** Represents a Result. */
                class Result implements IResult {

                    /**
                     * Constructs a new Result.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IResult);

                    /** Result data. */
                    public data: Uint8Array;

                    /** Result log. */
                    public log: string;

                    /** Result events. */
                    public events: tendermint.abci.IEvent[];

                    /**
                     * Encodes the specified Result message. Does not implicitly {@link cosmos.base.abci.v1beta1.Result.verify|verify} messages.
                     * @param message Result message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Result message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.Result.verify|verify} messages.
                     * @param message Result message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Result message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Result
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.Result;

                    /**
                     * Decodes a Result message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Result
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.Result;

                    /**
                     * Verifies a Result message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Result message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Result
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.Result;

                    /**
                     * Creates a plain object from a Result message. Also converts values to other types if specified.
                     * @param message Result
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.Result, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Result to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SimulationResponse. */
                interface ISimulationResponse {

                    /** SimulationResponse gas_info */
                    gas_info?: (cosmos.base.abci.v1beta1.IGasInfo|null);

                    /** SimulationResponse result */
                    result?: (cosmos.base.abci.v1beta1.IResult|null);
                }

                /** Represents a SimulationResponse. */
                class SimulationResponse implements ISimulationResponse {

                    /**
                     * Constructs a new SimulationResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.ISimulationResponse);

                    /** SimulationResponse gas_info. */
                    public gas_info?: (cosmos.base.abci.v1beta1.IGasInfo|null);

                    /** SimulationResponse result. */
                    public result?: (cosmos.base.abci.v1beta1.IResult|null);

                    /**
                     * Encodes the specified SimulationResponse message. Does not implicitly {@link cosmos.base.abci.v1beta1.SimulationResponse.verify|verify} messages.
                     * @param message SimulationResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.ISimulationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SimulationResponse message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.SimulationResponse.verify|verify} messages.
                     * @param message SimulationResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.ISimulationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SimulationResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SimulationResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.SimulationResponse;

                    /**
                     * Decodes a SimulationResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SimulationResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.SimulationResponse;

                    /**
                     * Verifies a SimulationResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SimulationResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SimulationResponse
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.SimulationResponse;

                    /**
                     * Creates a plain object from a SimulationResponse message. Also converts values to other types if specified.
                     * @param message SimulationResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.SimulationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SimulationResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MsgData. */
                interface IMsgData {

                    /** MsgData msg_type */
                    msg_type?: (string|null);

                    /** MsgData data */
                    data?: (Uint8Array|null);
                }

                /** Represents a MsgData. */
                class MsgData implements IMsgData {

                    /**
                     * Constructs a new MsgData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.IMsgData);

                    /** MsgData msg_type. */
                    public msg_type: string;

                    /** MsgData data. */
                    public data: Uint8Array;

                    /**
                     * Encodes the specified MsgData message. Does not implicitly {@link cosmos.base.abci.v1beta1.MsgData.verify|verify} messages.
                     * @param message MsgData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.IMsgData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MsgData message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.MsgData.verify|verify} messages.
                     * @param message MsgData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.IMsgData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MsgData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.MsgData;

                    /**
                     * Decodes a MsgData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MsgData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.MsgData;

                    /**
                     * Verifies a MsgData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MsgData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MsgData
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.MsgData;

                    /**
                     * Creates a plain object from a MsgData message. Also converts values to other types if specified.
                     * @param message MsgData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.MsgData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MsgData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TxMsgData. */
                interface ITxMsgData {

                    /** TxMsgData data */
                    data?: (cosmos.base.abci.v1beta1.IMsgData[]|null);
                }

                /** Represents a TxMsgData. */
                class TxMsgData implements ITxMsgData {

                    /**
                     * Constructs a new TxMsgData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.ITxMsgData);

                    /** TxMsgData data. */
                    public data: cosmos.base.abci.v1beta1.IMsgData[];

                    /**
                     * Encodes the specified TxMsgData message. Does not implicitly {@link cosmos.base.abci.v1beta1.TxMsgData.verify|verify} messages.
                     * @param message TxMsgData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.ITxMsgData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TxMsgData message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.TxMsgData.verify|verify} messages.
                     * @param message TxMsgData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.ITxMsgData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TxMsgData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TxMsgData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.TxMsgData;

                    /**
                     * Decodes a TxMsgData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TxMsgData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.TxMsgData;

                    /**
                     * Verifies a TxMsgData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TxMsgData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TxMsgData
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.TxMsgData;

                    /**
                     * Creates a plain object from a TxMsgData message. Also converts values to other types if specified.
                     * @param message TxMsgData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.TxMsgData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TxMsgData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SearchTxsResult. */
                interface ISearchTxsResult {

                    /** SearchTxsResult total_count */
                    total_count?: (Long|null);

                    /** SearchTxsResult count */
                    count?: (Long|null);

                    /** SearchTxsResult page_number */
                    page_number?: (Long|null);

                    /** SearchTxsResult page_total */
                    page_total?: (Long|null);

                    /** SearchTxsResult limit */
                    limit?: (Long|null);

                    /** SearchTxsResult txs */
                    txs?: (cosmos.base.abci.v1beta1.ITxResponse[]|null);
                }

                /** Represents a SearchTxsResult. */
                class SearchTxsResult implements ISearchTxsResult {

                    /**
                     * Constructs a new SearchTxsResult.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.abci.v1beta1.ISearchTxsResult);

                    /** SearchTxsResult total_count. */
                    public total_count: Long;

                    /** SearchTxsResult count. */
                    public count: Long;

                    /** SearchTxsResult page_number. */
                    public page_number: Long;

                    /** SearchTxsResult page_total. */
                    public page_total: Long;

                    /** SearchTxsResult limit. */
                    public limit: Long;

                    /** SearchTxsResult txs. */
                    public txs: cosmos.base.abci.v1beta1.ITxResponse[];

                    /**
                     * Encodes the specified SearchTxsResult message. Does not implicitly {@link cosmos.base.abci.v1beta1.SearchTxsResult.verify|verify} messages.
                     * @param message SearchTxsResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.abci.v1beta1.ISearchTxsResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SearchTxsResult message, length delimited. Does not implicitly {@link cosmos.base.abci.v1beta1.SearchTxsResult.verify|verify} messages.
                     * @param message SearchTxsResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.abci.v1beta1.ISearchTxsResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SearchTxsResult message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SearchTxsResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.abci.v1beta1.SearchTxsResult;

                    /**
                     * Decodes a SearchTxsResult message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SearchTxsResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.abci.v1beta1.SearchTxsResult;

                    /**
                     * Verifies a SearchTxsResult message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SearchTxsResult message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SearchTxsResult
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.abci.v1beta1.SearchTxsResult;

                    /**
                     * Creates a plain object from a SearchTxsResult message. Also converts values to other types if specified.
                     * @param message SearchTxsResult
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.abci.v1beta1.SearchTxsResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SearchTxsResult to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }
        }

        /** Namespace query. */
        namespace query {

            /** Namespace v1beta1. */
            namespace v1beta1 {

                /** Properties of a PageRequest. */
                interface IPageRequest {

                    /** PageRequest key */
                    key?: (Uint8Array|null);

                    /** PageRequest offset */
                    offset?: (Long|null);

                    /** PageRequest limit */
                    limit?: (Long|null);

                    /** PageRequest count_total */
                    count_total?: (boolean|null);

                    /** PageRequest reverse */
                    reverse?: (boolean|null);
                }

                /** Represents a PageRequest. */
                class PageRequest implements IPageRequest {

                    /**
                     * Constructs a new PageRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.query.v1beta1.IPageRequest);

                    /** PageRequest key. */
                    public key: Uint8Array;

                    /** PageRequest offset. */
                    public offset: Long;

                    /** PageRequest limit. */
                    public limit: Long;

                    /** PageRequest count_total. */
                    public count_total: boolean;

                    /** PageRequest reverse. */
                    public reverse: boolean;

                    /**
                     * Encodes the specified PageRequest message. Does not implicitly {@link cosmos.base.query.v1beta1.PageRequest.verify|verify} messages.
                     * @param message PageRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.query.v1beta1.IPageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PageRequest message, length delimited. Does not implicitly {@link cosmos.base.query.v1beta1.PageRequest.verify|verify} messages.
                     * @param message PageRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.query.v1beta1.IPageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PageRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PageRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.query.v1beta1.PageRequest;

                    /**
                     * Decodes a PageRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PageRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.query.v1beta1.PageRequest;

                    /**
                     * Verifies a PageRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PageRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PageRequest
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.query.v1beta1.PageRequest;

                    /**
                     * Creates a plain object from a PageRequest message. Also converts values to other types if specified.
                     * @param message PageRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.query.v1beta1.PageRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PageRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PageResponse. */
                interface IPageResponse {

                    /** PageResponse next_key */
                    next_key?: (Uint8Array|null);

                    /** PageResponse total */
                    total?: (Long|null);
                }

                /** Represents a PageResponse. */
                class PageResponse implements IPageResponse {

                    /**
                     * Constructs a new PageResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.base.query.v1beta1.IPageResponse);

                    /** PageResponse next_key. */
                    public next_key: Uint8Array;

                    /** PageResponse total. */
                    public total: Long;

                    /**
                     * Encodes the specified PageResponse message. Does not implicitly {@link cosmos.base.query.v1beta1.PageResponse.verify|verify} messages.
                     * @param message PageResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.base.query.v1beta1.IPageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PageResponse message, length delimited. Does not implicitly {@link cosmos.base.query.v1beta1.PageResponse.verify|verify} messages.
                     * @param message PageResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.base.query.v1beta1.IPageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PageResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PageResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.query.v1beta1.PageResponse;

                    /**
                     * Decodes a PageResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PageResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.query.v1beta1.PageResponse;

                    /**
                     * Verifies a PageResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PageResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PageResponse
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.base.query.v1beta1.PageResponse;

                    /**
                     * Creates a plain object from a PageResponse message. Also converts values to other types if specified.
                     * @param message PageResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.base.query.v1beta1.PageResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PageResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }
        }

        /** Namespace v1beta1. */
        namespace v1beta1 {

            /** Properties of a Coin. */
            interface ICoin {

                /** Coin denom */
                denom?: (string|null);

                /** Coin amount */
                amount?: (string|null);
            }

            /** Represents a Coin. */
            class Coin implements ICoin {

                /**
                 * Constructs a new Coin.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.base.v1beta1.ICoin);

                /** Coin denom. */
                public denom: string;

                /** Coin amount. */
                public amount: string;

                /**
                 * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @param message Coin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.base.v1beta1.ICoin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @param message Coin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.base.v1beta1.ICoin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Coin message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.v1beta1.Coin;

                /**
                 * Decodes a Coin message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.v1beta1.Coin;

                /**
                 * Verifies a Coin message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Coin message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Coin
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.base.v1beta1.Coin;

                /**
                 * Creates a plain object from a Coin message. Also converts values to other types if specified.
                 * @param message Coin
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.base.v1beta1.Coin, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Coin to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DecCoin. */
            interface IDecCoin {

                /** DecCoin denom */
                denom?: (string|null);

                /** DecCoin amount */
                amount?: (string|null);
            }

            /** Represents a DecCoin. */
            class DecCoin implements IDecCoin {

                /**
                 * Constructs a new DecCoin.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.base.v1beta1.IDecCoin);

                /** DecCoin denom. */
                public denom: string;

                /** DecCoin amount. */
                public amount: string;

                /**
                 * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @param message DecCoin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.base.v1beta1.IDecCoin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @param message DecCoin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.base.v1beta1.IDecCoin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DecCoin message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.v1beta1.DecCoin;

                /**
                 * Decodes a DecCoin message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.v1beta1.DecCoin;

                /**
                 * Verifies a DecCoin message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DecCoin
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.base.v1beta1.DecCoin;

                /**
                 * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
                 * @param message DecCoin
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.base.v1beta1.DecCoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DecCoin to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an IntProto. */
            interface IIntProto {

                /** IntProto int */
                int?: (string|null);
            }

            /** Represents an IntProto. */
            class IntProto implements IIntProto {

                /**
                 * Constructs a new IntProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.base.v1beta1.IIntProto);

                /** IntProto int. */
                public int: string;

                /**
                 * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @param message IntProto message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.base.v1beta1.IIntProto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @param message IntProto message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.base.v1beta1.IIntProto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an IntProto message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.v1beta1.IntProto;

                /**
                 * Decodes an IntProto message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.v1beta1.IntProto;

                /**
                 * Verifies an IntProto message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns IntProto
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.base.v1beta1.IntProto;

                /**
                 * Creates a plain object from an IntProto message. Also converts values to other types if specified.
                 * @param message IntProto
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.base.v1beta1.IntProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this IntProto to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DecProto. */
            interface IDecProto {

                /** DecProto dec */
                dec?: (string|null);
            }

            /** Represents a DecProto. */
            class DecProto implements IDecProto {

                /**
                 * Constructs a new DecProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.base.v1beta1.IDecProto);

                /** DecProto dec. */
                public dec: string;

                /**
                 * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @param message DecProto message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.base.v1beta1.IDecProto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @param message DecProto message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.base.v1beta1.IDecProto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DecProto message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.base.v1beta1.DecProto;

                /**
                 * Decodes a DecProto message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.base.v1beta1.DecProto;

                /**
                 * Verifies a DecProto message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DecProto
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.base.v1beta1.DecProto;

                /**
                 * Creates a plain object from a DecProto message. Also converts values to other types if specified.
                 * @param message DecProto
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.base.v1beta1.DecProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DecProto to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace crypto. */
    namespace crypto {

        /** Namespace ed25519. */
        namespace ed25519 {

            /** Properties of a PubKey. */
            interface IPubKey {

                /** PubKey key */
                key?: (Uint8Array|null);
            }

            /** Represents a PubKey. */
            class PubKey implements IPubKey {

                /**
                 * Constructs a new PubKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.ed25519.IPubKey);

                /** PubKey key. */
                public key: Uint8Array;

                /**
                 * Encodes the specified PubKey message. Does not implicitly {@link cosmos.crypto.ed25519.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.ed25519.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PubKey message, length delimited. Does not implicitly {@link cosmos.crypto.ed25519.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.ed25519.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PubKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.ed25519.PubKey;

                /**
                 * Decodes a PubKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.ed25519.PubKey;

                /**
                 * Verifies a PubKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PubKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PubKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.ed25519.PubKey;

                /**
                 * Creates a plain object from a PubKey message. Also converts values to other types if specified.
                 * @param message PubKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.ed25519.PubKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PubKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PrivKey. */
            interface IPrivKey {

                /** PrivKey key */
                key?: (Uint8Array|null);
            }

            /** Represents a PrivKey. */
            class PrivKey implements IPrivKey {

                /**
                 * Constructs a new PrivKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.ed25519.IPrivKey);

                /** PrivKey key. */
                public key: Uint8Array;

                /**
                 * Encodes the specified PrivKey message. Does not implicitly {@link cosmos.crypto.ed25519.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.ed25519.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PrivKey message, length delimited. Does not implicitly {@link cosmos.crypto.ed25519.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.ed25519.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.ed25519.PrivKey;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.ed25519.PrivKey;

                /**
                 * Verifies a PrivKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PrivKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PrivKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.ed25519.PrivKey;

                /**
                 * Creates a plain object from a PrivKey message. Also converts values to other types if specified.
                 * @param message PrivKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.ed25519.PrivKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PrivKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace multisig. */
        namespace multisig {

            /** Properties of a LegacyAminoPubKey. */
            interface ILegacyAminoPubKey {

                /** LegacyAminoPubKey threshold */
                threshold?: (number|null);

                /** LegacyAminoPubKey public_keys */
                public_keys?: (google.protobuf.IAny[]|null);
            }

            /** Represents a LegacyAminoPubKey. */
            class LegacyAminoPubKey implements ILegacyAminoPubKey {

                /**
                 * Constructs a new LegacyAminoPubKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.multisig.ILegacyAminoPubKey);

                /** LegacyAminoPubKey threshold. */
                public threshold: number;

                /** LegacyAminoPubKey public_keys. */
                public public_keys: google.protobuf.IAny[];

                /**
                 * Encodes the specified LegacyAminoPubKey message. Does not implicitly {@link cosmos.crypto.multisig.LegacyAminoPubKey.verify|verify} messages.
                 * @param message LegacyAminoPubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.multisig.ILegacyAminoPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LegacyAminoPubKey message, length delimited. Does not implicitly {@link cosmos.crypto.multisig.LegacyAminoPubKey.verify|verify} messages.
                 * @param message LegacyAminoPubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.multisig.ILegacyAminoPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LegacyAminoPubKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LegacyAminoPubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.multisig.LegacyAminoPubKey;

                /**
                 * Decodes a LegacyAminoPubKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LegacyAminoPubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.multisig.LegacyAminoPubKey;

                /**
                 * Verifies a LegacyAminoPubKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LegacyAminoPubKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LegacyAminoPubKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.multisig.LegacyAminoPubKey;

                /**
                 * Creates a plain object from a LegacyAminoPubKey message. Also converts values to other types if specified.
                 * @param message LegacyAminoPubKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.multisig.LegacyAminoPubKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LegacyAminoPubKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Namespace v1beta1. */
            namespace v1beta1 {

                /** Properties of a MultiSignature. */
                interface IMultiSignature {

                    /** MultiSignature signatures */
                    signatures?: (Uint8Array[]|null);
                }

                /** Represents a MultiSignature. */
                class MultiSignature implements IMultiSignature {

                    /**
                     * Constructs a new MultiSignature.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.crypto.multisig.v1beta1.IMultiSignature);

                    /** MultiSignature signatures. */
                    public signatures: Uint8Array[];

                    /**
                     * Encodes the specified MultiSignature message. Does not implicitly {@link cosmos.crypto.multisig.v1beta1.MultiSignature.verify|verify} messages.
                     * @param message MultiSignature message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.crypto.multisig.v1beta1.IMultiSignature, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MultiSignature message, length delimited. Does not implicitly {@link cosmos.crypto.multisig.v1beta1.MultiSignature.verify|verify} messages.
                     * @param message MultiSignature message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.crypto.multisig.v1beta1.IMultiSignature, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MultiSignature message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MultiSignature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.multisig.v1beta1.MultiSignature;

                    /**
                     * Decodes a MultiSignature message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MultiSignature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.multisig.v1beta1.MultiSignature;

                    /**
                     * Verifies a MultiSignature message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MultiSignature message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MultiSignature
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.crypto.multisig.v1beta1.MultiSignature;

                    /**
                     * Creates a plain object from a MultiSignature message. Also converts values to other types if specified.
                     * @param message MultiSignature
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.crypto.multisig.v1beta1.MultiSignature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MultiSignature to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CompactBitArray. */
                interface ICompactBitArray {

                    /** CompactBitArray extra_bits_stored */
                    extra_bits_stored?: (number|null);

                    /** CompactBitArray elems */
                    elems?: (Uint8Array|null);
                }

                /** Represents a CompactBitArray. */
                class CompactBitArray implements ICompactBitArray {

                    /**
                     * Constructs a new CompactBitArray.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.crypto.multisig.v1beta1.ICompactBitArray);

                    /** CompactBitArray extra_bits_stored. */
                    public extra_bits_stored: number;

                    /** CompactBitArray elems. */
                    public elems: Uint8Array;

                    /**
                     * Encodes the specified CompactBitArray message. Does not implicitly {@link cosmos.crypto.multisig.v1beta1.CompactBitArray.verify|verify} messages.
                     * @param message CompactBitArray message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.crypto.multisig.v1beta1.ICompactBitArray, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CompactBitArray message, length delimited. Does not implicitly {@link cosmos.crypto.multisig.v1beta1.CompactBitArray.verify|verify} messages.
                     * @param message CompactBitArray message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.crypto.multisig.v1beta1.ICompactBitArray, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CompactBitArray message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CompactBitArray
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.multisig.v1beta1.CompactBitArray;

                    /**
                     * Decodes a CompactBitArray message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CompactBitArray
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.multisig.v1beta1.CompactBitArray;

                    /**
                     * Verifies a CompactBitArray message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CompactBitArray message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CompactBitArray
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.crypto.multisig.v1beta1.CompactBitArray;

                    /**
                     * Creates a plain object from a CompactBitArray message. Also converts values to other types if specified.
                     * @param message CompactBitArray
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.crypto.multisig.v1beta1.CompactBitArray, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CompactBitArray to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }
        }

        /** Namespace secp256k1. */
        namespace secp256k1 {

            /** Properties of a PubKey. */
            interface IPubKey {

                /** PubKey key */
                key?: (Uint8Array|null);
            }

            /** Represents a PubKey. */
            class PubKey implements IPubKey {

                /**
                 * Constructs a new PubKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.secp256k1.IPubKey);

                /** PubKey key. */
                public key: Uint8Array;

                /**
                 * Encodes the specified PubKey message. Does not implicitly {@link cosmos.crypto.secp256k1.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.secp256k1.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PubKey message, length delimited. Does not implicitly {@link cosmos.crypto.secp256k1.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.secp256k1.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PubKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.secp256k1.PubKey;

                /**
                 * Decodes a PubKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.secp256k1.PubKey;

                /**
                 * Verifies a PubKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PubKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PubKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.secp256k1.PubKey;

                /**
                 * Creates a plain object from a PubKey message. Also converts values to other types if specified.
                 * @param message PubKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.secp256k1.PubKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PubKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PrivKey. */
            interface IPrivKey {

                /** PrivKey key */
                key?: (Uint8Array|null);
            }

            /** Represents a PrivKey. */
            class PrivKey implements IPrivKey {

                /**
                 * Constructs a new PrivKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.secp256k1.IPrivKey);

                /** PrivKey key. */
                public key: Uint8Array;

                /**
                 * Encodes the specified PrivKey message. Does not implicitly {@link cosmos.crypto.secp256k1.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.secp256k1.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PrivKey message, length delimited. Does not implicitly {@link cosmos.crypto.secp256k1.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.secp256k1.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.secp256k1.PrivKey;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.secp256k1.PrivKey;

                /**
                 * Verifies a PrivKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PrivKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PrivKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.secp256k1.PrivKey;

                /**
                 * Creates a plain object from a PrivKey message. Also converts values to other types if specified.
                 * @param message PrivKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.secp256k1.PrivKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PrivKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace secp256r1. */
        namespace secp256r1 {

            /** Properties of a PubKey. */
            interface IPubKey {

                /** PubKey key */
                key?: (Uint8Array|null);
            }

            /** Represents a PubKey. */
            class PubKey implements IPubKey {

                /**
                 * Constructs a new PubKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.secp256r1.IPubKey);

                /** PubKey key. */
                public key: Uint8Array;

                /**
                 * Encodes the specified PubKey message. Does not implicitly {@link cosmos.crypto.secp256r1.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.secp256r1.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PubKey message, length delimited. Does not implicitly {@link cosmos.crypto.secp256r1.PubKey.verify|verify} messages.
                 * @param message PubKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.secp256r1.IPubKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PubKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.secp256r1.PubKey;

                /**
                 * Decodes a PubKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.secp256r1.PubKey;

                /**
                 * Verifies a PubKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PubKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PubKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.secp256r1.PubKey;

                /**
                 * Creates a plain object from a PubKey message. Also converts values to other types if specified.
                 * @param message PubKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.secp256r1.PubKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PubKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PrivKey. */
            interface IPrivKey {

                /** PrivKey secret */
                secret?: (Uint8Array|null);
            }

            /** Represents a PrivKey. */
            class PrivKey implements IPrivKey {

                /**
                 * Constructs a new PrivKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.crypto.secp256r1.IPrivKey);

                /** PrivKey secret. */
                public secret: Uint8Array;

                /**
                 * Encodes the specified PrivKey message. Does not implicitly {@link cosmos.crypto.secp256r1.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.crypto.secp256r1.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PrivKey message, length delimited. Does not implicitly {@link cosmos.crypto.secp256r1.PrivKey.verify|verify} messages.
                 * @param message PrivKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.crypto.secp256r1.IPrivKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.crypto.secp256r1.PrivKey;

                /**
                 * Decodes a PrivKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PrivKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.crypto.secp256r1.PrivKey;

                /**
                 * Verifies a PrivKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PrivKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PrivKey
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.crypto.secp256r1.PrivKey;

                /**
                 * Creates a plain object from a PrivKey message. Also converts values to other types if specified.
                 * @param message PrivKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.crypto.secp256r1.PrivKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PrivKey to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace tx. */
    namespace tx {

        /** Namespace signing. */
        namespace signing {

            /** Namespace v1beta1. */
            namespace v1beta1 {

                /** SignMode enum. */
                enum SignMode {
                    SIGN_MODE_UNSPECIFIED = 0,
                    SIGN_MODE_DIRECT = 1,
                    SIGN_MODE_TEXTUAL = 2,
                    SIGN_MODE_LEGACY_AMINO_JSON = 127
                }

                /** Properties of a SignatureDescriptors. */
                interface ISignatureDescriptors {

                    /** SignatureDescriptors signatures */
                    signatures?: (cosmos.tx.signing.v1beta1.ISignatureDescriptor[]|null);
                }

                /** Represents a SignatureDescriptors. */
                class SignatureDescriptors implements ISignatureDescriptors {

                    /**
                     * Constructs a new SignatureDescriptors.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.tx.signing.v1beta1.ISignatureDescriptors);

                    /** SignatureDescriptors signatures. */
                    public signatures: cosmos.tx.signing.v1beta1.ISignatureDescriptor[];

                    /**
                     * Encodes the specified SignatureDescriptors message. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptors.verify|verify} messages.
                     * @param message SignatureDescriptors message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.tx.signing.v1beta1.ISignatureDescriptors, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SignatureDescriptors message, length delimited. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptors.verify|verify} messages.
                     * @param message SignatureDescriptors message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.tx.signing.v1beta1.ISignatureDescriptors, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SignatureDescriptors message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SignatureDescriptors
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.signing.v1beta1.SignatureDescriptors;

                    /**
                     * Decodes a SignatureDescriptors message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SignatureDescriptors
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.signing.v1beta1.SignatureDescriptors;

                    /**
                     * Verifies a SignatureDescriptors message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SignatureDescriptors message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SignatureDescriptors
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.tx.signing.v1beta1.SignatureDescriptors;

                    /**
                     * Creates a plain object from a SignatureDescriptors message. Also converts values to other types if specified.
                     * @param message SignatureDescriptors
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.tx.signing.v1beta1.SignatureDescriptors, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SignatureDescriptors to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SignatureDescriptor. */
                interface ISignatureDescriptor {

                    /** SignatureDescriptor public_key */
                    public_key?: (google.protobuf.IAny|null);

                    /** SignatureDescriptor data */
                    data?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.IData|null);

                    /** SignatureDescriptor sequence */
                    sequence?: (Long|null);
                }

                /** Represents a SignatureDescriptor. */
                class SignatureDescriptor implements ISignatureDescriptor {

                    /**
                     * Constructs a new SignatureDescriptor.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.tx.signing.v1beta1.ISignatureDescriptor);

                    /** SignatureDescriptor public_key. */
                    public public_key?: (google.protobuf.IAny|null);

                    /** SignatureDescriptor data. */
                    public data?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.IData|null);

                    /** SignatureDescriptor sequence. */
                    public sequence: Long;

                    /**
                     * Encodes the specified SignatureDescriptor message. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.verify|verify} messages.
                     * @param message SignatureDescriptor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.tx.signing.v1beta1.ISignatureDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SignatureDescriptor message, length delimited. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.verify|verify} messages.
                     * @param message SignatureDescriptor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.tx.signing.v1beta1.ISignatureDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SignatureDescriptor message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SignatureDescriptor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.signing.v1beta1.SignatureDescriptor;

                    /**
                     * Decodes a SignatureDescriptor message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SignatureDescriptor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.signing.v1beta1.SignatureDescriptor;

                    /**
                     * Verifies a SignatureDescriptor message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SignatureDescriptor message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SignatureDescriptor
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.tx.signing.v1beta1.SignatureDescriptor;

                    /**
                     * Creates a plain object from a SignatureDescriptor message. Also converts values to other types if specified.
                     * @param message SignatureDescriptor
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.tx.signing.v1beta1.SignatureDescriptor, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SignatureDescriptor to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace SignatureDescriptor {

                    /** Properties of a Data. */
                    interface IData {

                        /** Data single */
                        single?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.ISingle|null);

                        /** Data multi */
                        multi?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.IMulti|null);
                    }

                    /** Represents a Data. */
                    class Data implements IData {

                        /**
                         * Constructs a new Data.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: cosmos.tx.signing.v1beta1.SignatureDescriptor.IData);

                        /** Data single. */
                        public single?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.ISingle|null);

                        /** Data multi. */
                        public multi?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.IMulti|null);

                        /** Data sum. */
                        public sum?: ("single"|"multi");

                        /**
                         * Encodes the specified Data message. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.verify|verify} messages.
                         * @param message Data message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Data message, length delimited. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.verify|verify} messages.
                         * @param message Data message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Data message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Data
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data;

                        /**
                         * Decodes a Data message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Data
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data;

                        /**
                         * Verifies a Data message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Data message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Data
                         */
                        public static fromObject(object: { [k: string]: any }): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data;

                        /**
                         * Creates a plain object from a Data message. Also converts values to other types if specified.
                         * @param message Data
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Data to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace Data {

                        /** Properties of a Single. */
                        interface ISingle {

                            /** Single mode */
                            mode?: (cosmos.tx.signing.v1beta1.SignMode|null);

                            /** Single signature */
                            signature?: (Uint8Array|null);
                        }

                        /** Represents a Single. */
                        class Single implements ISingle {

                            /**
                             * Constructs a new Single.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.ISingle);

                            /** Single mode. */
                            public mode: cosmos.tx.signing.v1beta1.SignMode;

                            /** Single signature. */
                            public signature: Uint8Array;

                            /**
                             * Encodes the specified Single message. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single.verify|verify} messages.
                             * @param message Single message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.ISingle, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Single message, length delimited. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single.verify|verify} messages.
                             * @param message Single message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.ISingle, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a Single message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Single
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single;

                            /**
                             * Decodes a Single message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Single
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single;

                            /**
                             * Verifies a Single message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a Single message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Single
                             */
                            public static fromObject(object: { [k: string]: any }): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single;

                            /**
                             * Creates a plain object from a Single message. Also converts values to other types if specified.
                             * @param message Single
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Single to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }

                        /** Properties of a Multi. */
                        interface IMulti {

                            /** Multi bitarray */
                            bitarray?: (cosmos.crypto.multisig.v1beta1.ICompactBitArray|null);

                            /** Multi signatures */
                            signatures?: (cosmos.tx.signing.v1beta1.SignatureDescriptor.IData[]|null);
                        }

                        /** Represents a Multi. */
                        class Multi implements IMulti {

                            /**
                             * Constructs a new Multi.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.IMulti);

                            /** Multi bitarray. */
                            public bitarray?: (cosmos.crypto.multisig.v1beta1.ICompactBitArray|null);

                            /** Multi signatures. */
                            public signatures: cosmos.tx.signing.v1beta1.SignatureDescriptor.IData[];

                            /**
                             * Encodes the specified Multi message. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi.verify|verify} messages.
                             * @param message Multi message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.IMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Multi message, length delimited. Does not implicitly {@link cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi.verify|verify} messages.
                             * @param message Multi message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.IMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a Multi message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Multi
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi;

                            /**
                             * Decodes a Multi message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Multi
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi;

                            /**
                             * Verifies a Multi message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a Multi message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Multi
                             */
                            public static fromObject(object: { [k: string]: any }): cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi;

                            /**
                             * Creates a plain object from a Multi message. Also converts values to other types if specified.
                             * @param message Multi
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Multi to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }
                }
            }
        }

        /** Namespace v1beta1. */
        namespace v1beta1 {

            /** Properties of a Tx. */
            interface ITx {

                /** Tx body */
                body?: (cosmos.tx.v1beta1.ITxBody|null);

                /** Tx auth_info */
                auth_info?: (cosmos.tx.v1beta1.IAuthInfo|null);

                /** Tx signatures */
                signatures?: (Uint8Array[]|null);
            }

            /** Represents a Tx. */
            class Tx implements ITx {

                /**
                 * Constructs a new Tx.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ITx);

                /** Tx body. */
                public body?: (cosmos.tx.v1beta1.ITxBody|null);

                /** Tx auth_info. */
                public auth_info?: (cosmos.tx.v1beta1.IAuthInfo|null);

                /** Tx signatures. */
                public signatures: Uint8Array[];

                /**
                 * Encodes the specified Tx message. Does not implicitly {@link cosmos.tx.v1beta1.Tx.verify|verify} messages.
                 * @param message Tx message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ITx, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tx message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.Tx.verify|verify} messages.
                 * @param message Tx message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ITx, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tx message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.Tx;

                /**
                 * Decodes a Tx message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.Tx;

                /**
                 * Verifies a Tx message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Tx message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Tx
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.Tx;

                /**
                 * Creates a plain object from a Tx message. Also converts values to other types if specified.
                 * @param message Tx
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.Tx, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tx to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TxRaw. */
            interface ITxRaw {

                /** TxRaw body_bytes */
                body_bytes?: (Uint8Array|null);

                /** TxRaw auth_info_bytes */
                auth_info_bytes?: (Uint8Array|null);

                /** TxRaw signatures */
                signatures?: (Uint8Array[]|null);
            }

            /** Represents a TxRaw. */
            class TxRaw implements ITxRaw {

                /**
                 * Constructs a new TxRaw.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ITxRaw);

                /** TxRaw body_bytes. */
                public body_bytes: Uint8Array;

                /** TxRaw auth_info_bytes. */
                public auth_info_bytes: Uint8Array;

                /** TxRaw signatures. */
                public signatures: Uint8Array[];

                /**
                 * Encodes the specified TxRaw message. Does not implicitly {@link cosmos.tx.v1beta1.TxRaw.verify|verify} messages.
                 * @param message TxRaw message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ITxRaw, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TxRaw message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.TxRaw.verify|verify} messages.
                 * @param message TxRaw message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ITxRaw, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TxRaw message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TxRaw
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.TxRaw;

                /**
                 * Decodes a TxRaw message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TxRaw
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.TxRaw;

                /**
                 * Verifies a TxRaw message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TxRaw message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TxRaw
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.TxRaw;

                /**
                 * Creates a plain object from a TxRaw message. Also converts values to other types if specified.
                 * @param message TxRaw
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.TxRaw, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TxRaw to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SignDoc. */
            interface ISignDoc {

                /** SignDoc body_bytes */
                body_bytes?: (Uint8Array|null);

                /** SignDoc auth_info_bytes */
                auth_info_bytes?: (Uint8Array|null);

                /** SignDoc chain_id */
                chain_id?: (string|null);

                /** SignDoc account_number */
                account_number?: (Long|null);
            }

            /** Represents a SignDoc. */
            class SignDoc implements ISignDoc {

                /**
                 * Constructs a new SignDoc.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ISignDoc);

                /** SignDoc body_bytes. */
                public body_bytes: Uint8Array;

                /** SignDoc auth_info_bytes. */
                public auth_info_bytes: Uint8Array;

                /** SignDoc chain_id. */
                public chain_id: string;

                /** SignDoc account_number. */
                public account_number: Long;

                /**
                 * Encodes the specified SignDoc message. Does not implicitly {@link cosmos.tx.v1beta1.SignDoc.verify|verify} messages.
                 * @param message SignDoc message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ISignDoc, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SignDoc message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.SignDoc.verify|verify} messages.
                 * @param message SignDoc message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ISignDoc, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignDoc message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SignDoc
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.SignDoc;

                /**
                 * Decodes a SignDoc message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SignDoc
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.SignDoc;

                /**
                 * Verifies a SignDoc message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SignDoc message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SignDoc
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.SignDoc;

                /**
                 * Creates a plain object from a SignDoc message. Also converts values to other types if specified.
                 * @param message SignDoc
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.SignDoc, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SignDoc to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TxBody. */
            interface ITxBody {

                /** TxBody messages */
                messages?: (google.protobuf.IAny[]|null);

                /** TxBody memo */
                memo?: (string|null);

                /** TxBody timeout_height */
                timeout_height?: (Long|null);

                /** TxBody extension_options */
                extension_options?: (google.protobuf.IAny[]|null);

                /** TxBody non_critical_extension_options */
                non_critical_extension_options?: (google.protobuf.IAny[]|null);
            }

            /** Represents a TxBody. */
            class TxBody implements ITxBody {

                /**
                 * Constructs a new TxBody.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ITxBody);

                /** TxBody messages. */
                public messages: google.protobuf.IAny[];

                /** TxBody memo. */
                public memo: string;

                /** TxBody timeout_height. */
                public timeout_height: Long;

                /** TxBody extension_options. */
                public extension_options: google.protobuf.IAny[];

                /** TxBody non_critical_extension_options. */
                public non_critical_extension_options: google.protobuf.IAny[];

                /**
                 * Encodes the specified TxBody message. Does not implicitly {@link cosmos.tx.v1beta1.TxBody.verify|verify} messages.
                 * @param message TxBody message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ITxBody, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TxBody message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.TxBody.verify|verify} messages.
                 * @param message TxBody message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ITxBody, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TxBody message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TxBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.TxBody;

                /**
                 * Decodes a TxBody message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TxBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.TxBody;

                /**
                 * Verifies a TxBody message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TxBody message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TxBody
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.TxBody;

                /**
                 * Creates a plain object from a TxBody message. Also converts values to other types if specified.
                 * @param message TxBody
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.TxBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TxBody to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an AuthInfo. */
            interface IAuthInfo {

                /** AuthInfo signer_infos */
                signer_infos?: (cosmos.tx.v1beta1.ISignerInfo[]|null);

                /** AuthInfo fee */
                fee?: (cosmos.tx.v1beta1.IFee|null);
            }

            /** Represents an AuthInfo. */
            class AuthInfo implements IAuthInfo {

                /**
                 * Constructs a new AuthInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IAuthInfo);

                /** AuthInfo signer_infos. */
                public signer_infos: cosmos.tx.v1beta1.ISignerInfo[];

                /** AuthInfo fee. */
                public fee?: (cosmos.tx.v1beta1.IFee|null);

                /**
                 * Encodes the specified AuthInfo message. Does not implicitly {@link cosmos.tx.v1beta1.AuthInfo.verify|verify} messages.
                 * @param message AuthInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IAuthInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AuthInfo message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.AuthInfo.verify|verify} messages.
                 * @param message AuthInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IAuthInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AuthInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AuthInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.AuthInfo;

                /**
                 * Decodes an AuthInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AuthInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.AuthInfo;

                /**
                 * Verifies an AuthInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AuthInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AuthInfo
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.AuthInfo;

                /**
                 * Creates a plain object from an AuthInfo message. Also converts values to other types if specified.
                 * @param message AuthInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.AuthInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AuthInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SignerInfo. */
            interface ISignerInfo {

                /** SignerInfo public_key */
                public_key?: (google.protobuf.IAny|null);

                /** SignerInfo mode_info */
                mode_info?: (cosmos.tx.v1beta1.IModeInfo|null);

                /** SignerInfo sequence */
                sequence?: (Long|null);
            }

            /** Represents a SignerInfo. */
            class SignerInfo implements ISignerInfo {

                /**
                 * Constructs a new SignerInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ISignerInfo);

                /** SignerInfo public_key. */
                public public_key?: (google.protobuf.IAny|null);

                /** SignerInfo mode_info. */
                public mode_info?: (cosmos.tx.v1beta1.IModeInfo|null);

                /** SignerInfo sequence. */
                public sequence: Long;

                /**
                 * Encodes the specified SignerInfo message. Does not implicitly {@link cosmos.tx.v1beta1.SignerInfo.verify|verify} messages.
                 * @param message SignerInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ISignerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SignerInfo message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.SignerInfo.verify|verify} messages.
                 * @param message SignerInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ISignerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignerInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SignerInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.SignerInfo;

                /**
                 * Decodes a SignerInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SignerInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.SignerInfo;

                /**
                 * Verifies a SignerInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SignerInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SignerInfo
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.SignerInfo;

                /**
                 * Creates a plain object from a SignerInfo message. Also converts values to other types if specified.
                 * @param message SignerInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.SignerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SignerInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ModeInfo. */
            interface IModeInfo {

                /** ModeInfo single */
                single?: (cosmos.tx.v1beta1.ModeInfo.ISingle|null);

                /** ModeInfo multi */
                multi?: (cosmos.tx.v1beta1.ModeInfo.IMulti|null);
            }

            /** Represents a ModeInfo. */
            class ModeInfo implements IModeInfo {

                /**
                 * Constructs a new ModeInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IModeInfo);

                /** ModeInfo single. */
                public single?: (cosmos.tx.v1beta1.ModeInfo.ISingle|null);

                /** ModeInfo multi. */
                public multi?: (cosmos.tx.v1beta1.ModeInfo.IMulti|null);

                /** ModeInfo sum. */
                public sum?: ("single"|"multi");

                /**
                 * Encodes the specified ModeInfo message. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.verify|verify} messages.
                 * @param message ModeInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IModeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ModeInfo message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.verify|verify} messages.
                 * @param message ModeInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IModeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ModeInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ModeInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.ModeInfo;

                /**
                 * Decodes a ModeInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ModeInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.ModeInfo;

                /**
                 * Verifies a ModeInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ModeInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ModeInfo
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.ModeInfo;

                /**
                 * Creates a plain object from a ModeInfo message. Also converts values to other types if specified.
                 * @param message ModeInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.ModeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ModeInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace ModeInfo {

                /** Properties of a Single. */
                interface ISingle {

                    /** Single mode */
                    mode?: (cosmos.tx.signing.v1beta1.SignMode|null);
                }

                /** Represents a Single. */
                class Single implements ISingle {

                    /**
                     * Constructs a new Single.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.tx.v1beta1.ModeInfo.ISingle);

                    /** Single mode. */
                    public mode: cosmos.tx.signing.v1beta1.SignMode;

                    /**
                     * Encodes the specified Single message. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.Single.verify|verify} messages.
                     * @param message Single message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.tx.v1beta1.ModeInfo.ISingle, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Single message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.Single.verify|verify} messages.
                     * @param message Single message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.tx.v1beta1.ModeInfo.ISingle, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Single message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Single
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.ModeInfo.Single;

                    /**
                     * Decodes a Single message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Single
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.ModeInfo.Single;

                    /**
                     * Verifies a Single message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Single message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Single
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.ModeInfo.Single;

                    /**
                     * Creates a plain object from a Single message. Also converts values to other types if specified.
                     * @param message Single
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.tx.v1beta1.ModeInfo.Single, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Single to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Multi. */
                interface IMulti {

                    /** Multi bitarray */
                    bitarray?: (cosmos.crypto.multisig.v1beta1.ICompactBitArray|null);

                    /** Multi mode_infos */
                    mode_infos?: (cosmos.tx.v1beta1.IModeInfo[]|null);
                }

                /** Represents a Multi. */
                class Multi implements IMulti {

                    /**
                     * Constructs a new Multi.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: cosmos.tx.v1beta1.ModeInfo.IMulti);

                    /** Multi bitarray. */
                    public bitarray?: (cosmos.crypto.multisig.v1beta1.ICompactBitArray|null);

                    /** Multi mode_infos. */
                    public mode_infos: cosmos.tx.v1beta1.IModeInfo[];

                    /**
                     * Encodes the specified Multi message. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.Multi.verify|verify} messages.
                     * @param message Multi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: cosmos.tx.v1beta1.ModeInfo.IMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Multi message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.ModeInfo.Multi.verify|verify} messages.
                     * @param message Multi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: cosmos.tx.v1beta1.ModeInfo.IMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Multi message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Multi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.ModeInfo.Multi;

                    /**
                     * Decodes a Multi message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Multi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.ModeInfo.Multi;

                    /**
                     * Verifies a Multi message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Multi message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Multi
                     */
                    public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.ModeInfo.Multi;

                    /**
                     * Creates a plain object from a Multi message. Also converts values to other types if specified.
                     * @param message Multi
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: cosmos.tx.v1beta1.ModeInfo.Multi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Multi to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a Fee. */
            interface IFee {

                /** Fee amount */
                amount?: (cosmos.base.v1beta1.ICoin[]|null);

                /** Fee gas_limit */
                gas_limit?: (Long|null);

                /** Fee payer */
                payer?: (string|null);

                /** Fee granter */
                granter?: (string|null);
            }

            /** Represents a Fee. */
            class Fee implements IFee {

                /**
                 * Constructs a new Fee.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IFee);

                /** Fee amount. */
                public amount: cosmos.base.v1beta1.ICoin[];

                /** Fee gas_limit. */
                public gas_limit: Long;

                /** Fee payer. */
                public payer: string;

                /** Fee granter. */
                public granter: string;

                /**
                 * Encodes the specified Fee message. Does not implicitly {@link cosmos.tx.v1beta1.Fee.verify|verify} messages.
                 * @param message Fee message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IFee, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Fee message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.Fee.verify|verify} messages.
                 * @param message Fee message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IFee, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Fee message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Fee
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.Fee;

                /**
                 * Decodes a Fee message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Fee
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.Fee;

                /**
                 * Verifies a Fee message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Fee message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Fee
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.Fee;

                /**
                 * Creates a plain object from a Fee message. Also converts values to other types if specified.
                 * @param message Fee
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.Fee, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Fee to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Represents a Service */
            class Service extends $protobuf.rpc.Service {

                /**
                 * Constructs a new Service service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Calls Simulate.
                 * @param request SimulateRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and SimulateResponse
                 */
                public simulate(request: cosmos.tx.v1beta1.ISimulateRequest, callback: cosmos.tx.v1beta1.Service.SimulateCallback): void;

                /**
                 * Calls Simulate.
                 * @param request SimulateRequest message or plain object
                 * @returns Promise
                 */
                public simulate(request: cosmos.tx.v1beta1.ISimulateRequest): Promise<cosmos.tx.v1beta1.SimulateResponse>;

                /**
                 * Calls GetTx.
                 * @param request GetTxRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetTxResponse
                 */
                public getTx(request: cosmos.tx.v1beta1.IGetTxRequest, callback: cosmos.tx.v1beta1.Service.GetTxCallback): void;

                /**
                 * Calls GetTx.
                 * @param request GetTxRequest message or plain object
                 * @returns Promise
                 */
                public getTx(request: cosmos.tx.v1beta1.IGetTxRequest): Promise<cosmos.tx.v1beta1.GetTxResponse>;

                /**
                 * Calls BroadcastTx.
                 * @param request BroadcastTxRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and BroadcastTxResponse
                 */
                public broadcastTx(request: cosmos.tx.v1beta1.IBroadcastTxRequest, callback: cosmos.tx.v1beta1.Service.BroadcastTxCallback): void;

                /**
                 * Calls BroadcastTx.
                 * @param request BroadcastTxRequest message or plain object
                 * @returns Promise
                 */
                public broadcastTx(request: cosmos.tx.v1beta1.IBroadcastTxRequest): Promise<cosmos.tx.v1beta1.BroadcastTxResponse>;

                /**
                 * Calls GetTxsEvent.
                 * @param request GetTxsEventRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetTxsEventResponse
                 */
                public getTxsEvent(request: cosmos.tx.v1beta1.IGetTxsEventRequest, callback: cosmos.tx.v1beta1.Service.GetTxsEventCallback): void;

                /**
                 * Calls GetTxsEvent.
                 * @param request GetTxsEventRequest message or plain object
                 * @returns Promise
                 */
                public getTxsEvent(request: cosmos.tx.v1beta1.IGetTxsEventRequest): Promise<cosmos.tx.v1beta1.GetTxsEventResponse>;
            }

            namespace Service {

                /**
                 * Callback as used by {@link cosmos.tx.v1beta1.Service#simulate}.
                 * @param error Error, if any
                 * @param [response] SimulateResponse
                 */
                type SimulateCallback = (error: (Error|null), response?: cosmos.tx.v1beta1.SimulateResponse) => void;

                /**
                 * Callback as used by {@link cosmos.tx.v1beta1.Service#getTx}.
                 * @param error Error, if any
                 * @param [response] GetTxResponse
                 */
                type GetTxCallback = (error: (Error|null), response?: cosmos.tx.v1beta1.GetTxResponse) => void;

                /**
                 * Callback as used by {@link cosmos.tx.v1beta1.Service#broadcastTx}.
                 * @param error Error, if any
                 * @param [response] BroadcastTxResponse
                 */
                type BroadcastTxCallback = (error: (Error|null), response?: cosmos.tx.v1beta1.BroadcastTxResponse) => void;

                /**
                 * Callback as used by {@link cosmos.tx.v1beta1.Service#getTxsEvent}.
                 * @param error Error, if any
                 * @param [response] GetTxsEventResponse
                 */
                type GetTxsEventCallback = (error: (Error|null), response?: cosmos.tx.v1beta1.GetTxsEventResponse) => void;
            }

            /** Properties of a GetTxsEventRequest. */
            interface IGetTxsEventRequest {

                /** GetTxsEventRequest events */
                events?: (string[]|null);

                /** GetTxsEventRequest pagination */
                pagination?: (cosmos.base.query.v1beta1.IPageRequest|null);

                /** GetTxsEventRequest order_by */
                order_by?: (cosmos.tx.v1beta1.OrderBy|null);
            }

            /** Represents a GetTxsEventRequest. */
            class GetTxsEventRequest implements IGetTxsEventRequest {

                /**
                 * Constructs a new GetTxsEventRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IGetTxsEventRequest);

                /** GetTxsEventRequest events. */
                public events: string[];

                /** GetTxsEventRequest pagination. */
                public pagination?: (cosmos.base.query.v1beta1.IPageRequest|null);

                /** GetTxsEventRequest order_by. */
                public order_by: cosmos.tx.v1beta1.OrderBy;

                /**
                 * Encodes the specified GetTxsEventRequest message. Does not implicitly {@link cosmos.tx.v1beta1.GetTxsEventRequest.verify|verify} messages.
                 * @param message GetTxsEventRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IGetTxsEventRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTxsEventRequest message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.GetTxsEventRequest.verify|verify} messages.
                 * @param message GetTxsEventRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IGetTxsEventRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTxsEventRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTxsEventRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.GetTxsEventRequest;

                /**
                 * Decodes a GetTxsEventRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTxsEventRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.GetTxsEventRequest;

                /**
                 * Verifies a GetTxsEventRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTxsEventRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTxsEventRequest
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.GetTxsEventRequest;

                /**
                 * Creates a plain object from a GetTxsEventRequest message. Also converts values to other types if specified.
                 * @param message GetTxsEventRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.GetTxsEventRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTxsEventRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** OrderBy enum. */
            enum OrderBy {
                ORDER_BY_UNSPECIFIED = 0,
                ORDER_BY_ASC = 1,
                ORDER_BY_DESC = 2
            }

            /** Properties of a GetTxsEventResponse. */
            interface IGetTxsEventResponse {

                /** GetTxsEventResponse txs */
                txs?: (cosmos.tx.v1beta1.ITx[]|null);

                /** GetTxsEventResponse tx_responses */
                tx_responses?: (cosmos.base.abci.v1beta1.ITxResponse[]|null);

                /** GetTxsEventResponse pagination */
                pagination?: (cosmos.base.query.v1beta1.IPageResponse|null);
            }

            /** Represents a GetTxsEventResponse. */
            class GetTxsEventResponse implements IGetTxsEventResponse {

                /**
                 * Constructs a new GetTxsEventResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IGetTxsEventResponse);

                /** GetTxsEventResponse txs. */
                public txs: cosmos.tx.v1beta1.ITx[];

                /** GetTxsEventResponse tx_responses. */
                public tx_responses: cosmos.base.abci.v1beta1.ITxResponse[];

                /** GetTxsEventResponse pagination. */
                public pagination?: (cosmos.base.query.v1beta1.IPageResponse|null);

                /**
                 * Encodes the specified GetTxsEventResponse message. Does not implicitly {@link cosmos.tx.v1beta1.GetTxsEventResponse.verify|verify} messages.
                 * @param message GetTxsEventResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IGetTxsEventResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTxsEventResponse message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.GetTxsEventResponse.verify|verify} messages.
                 * @param message GetTxsEventResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IGetTxsEventResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTxsEventResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTxsEventResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.GetTxsEventResponse;

                /**
                 * Decodes a GetTxsEventResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTxsEventResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.GetTxsEventResponse;

                /**
                 * Verifies a GetTxsEventResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTxsEventResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTxsEventResponse
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.GetTxsEventResponse;

                /**
                 * Creates a plain object from a GetTxsEventResponse message. Also converts values to other types if specified.
                 * @param message GetTxsEventResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.GetTxsEventResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTxsEventResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BroadcastTxRequest. */
            interface IBroadcastTxRequest {

                /** BroadcastTxRequest tx_bytes */
                tx_bytes?: (Uint8Array|null);

                /** BroadcastTxRequest mode */
                mode?: (cosmos.tx.v1beta1.BroadcastMode|null);
            }

            /** Represents a BroadcastTxRequest. */
            class BroadcastTxRequest implements IBroadcastTxRequest {

                /**
                 * Constructs a new BroadcastTxRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IBroadcastTxRequest);

                /** BroadcastTxRequest tx_bytes. */
                public tx_bytes: Uint8Array;

                /** BroadcastTxRequest mode. */
                public mode: cosmos.tx.v1beta1.BroadcastMode;

                /**
                 * Encodes the specified BroadcastTxRequest message. Does not implicitly {@link cosmos.tx.v1beta1.BroadcastTxRequest.verify|verify} messages.
                 * @param message BroadcastTxRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IBroadcastTxRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BroadcastTxRequest message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.BroadcastTxRequest.verify|verify} messages.
                 * @param message BroadcastTxRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IBroadcastTxRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BroadcastTxRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BroadcastTxRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.BroadcastTxRequest;

                /**
                 * Decodes a BroadcastTxRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BroadcastTxRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.BroadcastTxRequest;

                /**
                 * Verifies a BroadcastTxRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BroadcastTxRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BroadcastTxRequest
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.BroadcastTxRequest;

                /**
                 * Creates a plain object from a BroadcastTxRequest message. Also converts values to other types if specified.
                 * @param message BroadcastTxRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.BroadcastTxRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BroadcastTxRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** BroadcastMode enum. */
            enum BroadcastMode {
                BROADCAST_MODE_UNSPECIFIED = 0,
                BROADCAST_MODE_BLOCK = 1,
                BROADCAST_MODE_SYNC = 2,
                BROADCAST_MODE_ASYNC = 3
            }

            /** Properties of a BroadcastTxResponse. */
            interface IBroadcastTxResponse {

                /** BroadcastTxResponse tx_response */
                tx_response?: (cosmos.base.abci.v1beta1.ITxResponse|null);
            }

            /** Represents a BroadcastTxResponse. */
            class BroadcastTxResponse implements IBroadcastTxResponse {

                /**
                 * Constructs a new BroadcastTxResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IBroadcastTxResponse);

                /** BroadcastTxResponse tx_response. */
                public tx_response?: (cosmos.base.abci.v1beta1.ITxResponse|null);

                /**
                 * Encodes the specified BroadcastTxResponse message. Does not implicitly {@link cosmos.tx.v1beta1.BroadcastTxResponse.verify|verify} messages.
                 * @param message BroadcastTxResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IBroadcastTxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BroadcastTxResponse message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.BroadcastTxResponse.verify|verify} messages.
                 * @param message BroadcastTxResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IBroadcastTxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BroadcastTxResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BroadcastTxResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.BroadcastTxResponse;

                /**
                 * Decodes a BroadcastTxResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BroadcastTxResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.BroadcastTxResponse;

                /**
                 * Verifies a BroadcastTxResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BroadcastTxResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BroadcastTxResponse
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.BroadcastTxResponse;

                /**
                 * Creates a plain object from a BroadcastTxResponse message. Also converts values to other types if specified.
                 * @param message BroadcastTxResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.BroadcastTxResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BroadcastTxResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SimulateRequest. */
            interface ISimulateRequest {

                /** SimulateRequest tx */
                tx?: (cosmos.tx.v1beta1.ITx|null);

                /** SimulateRequest tx_bytes */
                tx_bytes?: (Uint8Array|null);
            }

            /** Represents a SimulateRequest. */
            class SimulateRequest implements ISimulateRequest {

                /**
                 * Constructs a new SimulateRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ISimulateRequest);

                /** SimulateRequest tx. */
                public tx?: (cosmos.tx.v1beta1.ITx|null);

                /** SimulateRequest tx_bytes. */
                public tx_bytes: Uint8Array;

                /**
                 * Encodes the specified SimulateRequest message. Does not implicitly {@link cosmos.tx.v1beta1.SimulateRequest.verify|verify} messages.
                 * @param message SimulateRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ISimulateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SimulateRequest message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.SimulateRequest.verify|verify} messages.
                 * @param message SimulateRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ISimulateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SimulateRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SimulateRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.SimulateRequest;

                /**
                 * Decodes a SimulateRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SimulateRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.SimulateRequest;

                /**
                 * Verifies a SimulateRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SimulateRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SimulateRequest
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.SimulateRequest;

                /**
                 * Creates a plain object from a SimulateRequest message. Also converts values to other types if specified.
                 * @param message SimulateRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.SimulateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SimulateRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SimulateResponse. */
            interface ISimulateResponse {

                /** SimulateResponse gas_info */
                gas_info?: (cosmos.base.abci.v1beta1.IGasInfo|null);

                /** SimulateResponse result */
                result?: (cosmos.base.abci.v1beta1.IResult|null);
            }

            /** Represents a SimulateResponse. */
            class SimulateResponse implements ISimulateResponse {

                /**
                 * Constructs a new SimulateResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.ISimulateResponse);

                /** SimulateResponse gas_info. */
                public gas_info?: (cosmos.base.abci.v1beta1.IGasInfo|null);

                /** SimulateResponse result. */
                public result?: (cosmos.base.abci.v1beta1.IResult|null);

                /**
                 * Encodes the specified SimulateResponse message. Does not implicitly {@link cosmos.tx.v1beta1.SimulateResponse.verify|verify} messages.
                 * @param message SimulateResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.ISimulateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SimulateResponse message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.SimulateResponse.verify|verify} messages.
                 * @param message SimulateResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.ISimulateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SimulateResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SimulateResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.SimulateResponse;

                /**
                 * Decodes a SimulateResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SimulateResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.SimulateResponse;

                /**
                 * Verifies a SimulateResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SimulateResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SimulateResponse
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.SimulateResponse;

                /**
                 * Creates a plain object from a SimulateResponse message. Also converts values to other types if specified.
                 * @param message SimulateResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.SimulateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SimulateResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTxRequest. */
            interface IGetTxRequest {

                /** GetTxRequest hash */
                hash?: (string|null);
            }

            /** Represents a GetTxRequest. */
            class GetTxRequest implements IGetTxRequest {

                /**
                 * Constructs a new GetTxRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IGetTxRequest);

                /** GetTxRequest hash. */
                public hash: string;

                /**
                 * Encodes the specified GetTxRequest message. Does not implicitly {@link cosmos.tx.v1beta1.GetTxRequest.verify|verify} messages.
                 * @param message GetTxRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IGetTxRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTxRequest message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.GetTxRequest.verify|verify} messages.
                 * @param message GetTxRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IGetTxRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTxRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTxRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.GetTxRequest;

                /**
                 * Decodes a GetTxRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTxRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.GetTxRequest;

                /**
                 * Verifies a GetTxRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTxRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTxRequest
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.GetTxRequest;

                /**
                 * Creates a plain object from a GetTxRequest message. Also converts values to other types if specified.
                 * @param message GetTxRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.GetTxRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTxRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTxResponse. */
            interface IGetTxResponse {

                /** GetTxResponse tx */
                tx?: (cosmos.tx.v1beta1.ITx|null);

                /** GetTxResponse tx_response */
                tx_response?: (cosmos.base.abci.v1beta1.ITxResponse|null);
            }

            /** Represents a GetTxResponse. */
            class GetTxResponse implements IGetTxResponse {

                /**
                 * Constructs a new GetTxResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: cosmos.tx.v1beta1.IGetTxResponse);

                /** GetTxResponse tx. */
                public tx?: (cosmos.tx.v1beta1.ITx|null);

                /** GetTxResponse tx_response. */
                public tx_response?: (cosmos.base.abci.v1beta1.ITxResponse|null);

                /**
                 * Encodes the specified GetTxResponse message. Does not implicitly {@link cosmos.tx.v1beta1.GetTxResponse.verify|verify} messages.
                 * @param message GetTxResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: cosmos.tx.v1beta1.IGetTxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTxResponse message, length delimited. Does not implicitly {@link cosmos.tx.v1beta1.GetTxResponse.verify|verify} messages.
                 * @param message GetTxResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: cosmos.tx.v1beta1.IGetTxResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTxResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTxResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cosmos.tx.v1beta1.GetTxResponse;

                /**
                 * Decodes a GetTxResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTxResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cosmos.tx.v1beta1.GetTxResponse;

                /**
                 * Verifies a GetTxResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTxResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTxResponse
                 */
                public static fromObject(object: { [k: string]: any }): cosmos.tx.v1beta1.GetTxResponse;

                /**
                 * Creates a plain object from a GetTxResponse message. Also converts values to other types if specified.
                 * @param message GetTxResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: cosmos.tx.v1beta1.GetTxResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTxResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}

/** Namespace tendermint. */
export namespace tendermint {

    /** Namespace abci. */
    namespace abci {

        /** Properties of a Request. */
        interface IRequest {

            /** Request echo */
            echo?: (tendermint.abci.IRequestEcho|null);

            /** Request flush */
            flush?: (tendermint.abci.IRequestFlush|null);

            /** Request info */
            info?: (tendermint.abci.IRequestInfo|null);

            /** Request set_option */
            set_option?: (tendermint.abci.IRequestSetOption|null);

            /** Request init_chain */
            init_chain?: (tendermint.abci.IRequestInitChain|null);

            /** Request query */
            query?: (tendermint.abci.IRequestQuery|null);

            /** Request begin_block */
            begin_block?: (tendermint.abci.IRequestBeginBlock|null);

            /** Request check_tx */
            check_tx?: (tendermint.abci.IRequestCheckTx|null);

            /** Request deliver_tx */
            deliver_tx?: (tendermint.abci.IRequestDeliverTx|null);

            /** Request end_block */
            end_block?: (tendermint.abci.IRequestEndBlock|null);

            /** Request commit */
            commit?: (tendermint.abci.IRequestCommit|null);

            /** Request list_snapshots */
            list_snapshots?: (tendermint.abci.IRequestListSnapshots|null);

            /** Request offer_snapshot */
            offer_snapshot?: (tendermint.abci.IRequestOfferSnapshot|null);

            /** Request load_snapshot_chunk */
            load_snapshot_chunk?: (tendermint.abci.IRequestLoadSnapshotChunk|null);

            /** Request apply_snapshot_chunk */
            apply_snapshot_chunk?: (tendermint.abci.IRequestApplySnapshotChunk|null);
        }

        /** Represents a Request. */
        class Request implements IRequest {

            /**
             * Constructs a new Request.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequest);

            /** Request echo. */
            public echo?: (tendermint.abci.IRequestEcho|null);

            /** Request flush. */
            public flush?: (tendermint.abci.IRequestFlush|null);

            /** Request info. */
            public info?: (tendermint.abci.IRequestInfo|null);

            /** Request set_option. */
            public set_option?: (tendermint.abci.IRequestSetOption|null);

            /** Request init_chain. */
            public init_chain?: (tendermint.abci.IRequestInitChain|null);

            /** Request query. */
            public query?: (tendermint.abci.IRequestQuery|null);

            /** Request begin_block. */
            public begin_block?: (tendermint.abci.IRequestBeginBlock|null);

            /** Request check_tx. */
            public check_tx?: (tendermint.abci.IRequestCheckTx|null);

            /** Request deliver_tx. */
            public deliver_tx?: (tendermint.abci.IRequestDeliverTx|null);

            /** Request end_block. */
            public end_block?: (tendermint.abci.IRequestEndBlock|null);

            /** Request commit. */
            public commit?: (tendermint.abci.IRequestCommit|null);

            /** Request list_snapshots. */
            public list_snapshots?: (tendermint.abci.IRequestListSnapshots|null);

            /** Request offer_snapshot. */
            public offer_snapshot?: (tendermint.abci.IRequestOfferSnapshot|null);

            /** Request load_snapshot_chunk. */
            public load_snapshot_chunk?: (tendermint.abci.IRequestLoadSnapshotChunk|null);

            /** Request apply_snapshot_chunk. */
            public apply_snapshot_chunk?: (tendermint.abci.IRequestApplySnapshotChunk|null);

            /** Request value. */
            public value?: ("echo"|"flush"|"info"|"set_option"|"init_chain"|"query"|"begin_block"|"check_tx"|"deliver_tx"|"end_block"|"commit"|"list_snapshots"|"offer_snapshot"|"load_snapshot_chunk"|"apply_snapshot_chunk");

            /**
             * Encodes the specified Request message. Does not implicitly {@link tendermint.abci.Request.verify|verify} messages.
             * @param message Request message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Request message, length delimited. Does not implicitly {@link tendermint.abci.Request.verify|verify} messages.
             * @param message Request message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Request message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Request
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Request;

            /**
             * Decodes a Request message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Request
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Request;

            /**
             * Verifies a Request message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Request message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Request
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Request;

            /**
             * Creates a plain object from a Request message. Also converts values to other types if specified.
             * @param message Request
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Request to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestEcho. */
        interface IRequestEcho {

            /** RequestEcho message */
            message?: (string|null);
        }

        /** Represents a RequestEcho. */
        class RequestEcho implements IRequestEcho {

            /**
             * Constructs a new RequestEcho.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestEcho);

            /** RequestEcho message. */
            public message: string;

            /**
             * Encodes the specified RequestEcho message. Does not implicitly {@link tendermint.abci.RequestEcho.verify|verify} messages.
             * @param message RequestEcho message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestEcho, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestEcho message, length delimited. Does not implicitly {@link tendermint.abci.RequestEcho.verify|verify} messages.
             * @param message RequestEcho message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestEcho, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestEcho message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestEcho
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestEcho;

            /**
             * Decodes a RequestEcho message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestEcho
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestEcho;

            /**
             * Verifies a RequestEcho message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestEcho message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestEcho
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestEcho;

            /**
             * Creates a plain object from a RequestEcho message. Also converts values to other types if specified.
             * @param message RequestEcho
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestEcho, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestEcho to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestFlush. */
        interface IRequestFlush {
        }

        /** Represents a RequestFlush. */
        class RequestFlush implements IRequestFlush {

            /**
             * Constructs a new RequestFlush.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestFlush);

            /**
             * Encodes the specified RequestFlush message. Does not implicitly {@link tendermint.abci.RequestFlush.verify|verify} messages.
             * @param message RequestFlush message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestFlush, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestFlush message, length delimited. Does not implicitly {@link tendermint.abci.RequestFlush.verify|verify} messages.
             * @param message RequestFlush message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestFlush, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestFlush message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestFlush
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestFlush;

            /**
             * Decodes a RequestFlush message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestFlush
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestFlush;

            /**
             * Verifies a RequestFlush message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestFlush message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestFlush
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestFlush;

            /**
             * Creates a plain object from a RequestFlush message. Also converts values to other types if specified.
             * @param message RequestFlush
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestFlush, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestFlush to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestInfo. */
        interface IRequestInfo {

            /** RequestInfo version */
            version?: (string|null);

            /** RequestInfo block_version */
            block_version?: (Long|null);

            /** RequestInfo p2p_version */
            p2p_version?: (Long|null);
        }

        /** Represents a RequestInfo. */
        class RequestInfo implements IRequestInfo {

            /**
             * Constructs a new RequestInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestInfo);

            /** RequestInfo version. */
            public version: string;

            /** RequestInfo block_version. */
            public block_version: Long;

            /** RequestInfo p2p_version. */
            public p2p_version: Long;

            /**
             * Encodes the specified RequestInfo message. Does not implicitly {@link tendermint.abci.RequestInfo.verify|verify} messages.
             * @param message RequestInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestInfo message, length delimited. Does not implicitly {@link tendermint.abci.RequestInfo.verify|verify} messages.
             * @param message RequestInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestInfo;

            /**
             * Decodes a RequestInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestInfo;

            /**
             * Verifies a RequestInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestInfo
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestInfo;

            /**
             * Creates a plain object from a RequestInfo message. Also converts values to other types if specified.
             * @param message RequestInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestSetOption. */
        interface IRequestSetOption {

            /** RequestSetOption key */
            key?: (string|null);

            /** RequestSetOption value */
            value?: (string|null);
        }

        /** Represents a RequestSetOption. */
        class RequestSetOption implements IRequestSetOption {

            /**
             * Constructs a new RequestSetOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestSetOption);

            /** RequestSetOption key. */
            public key: string;

            /** RequestSetOption value. */
            public value: string;

            /**
             * Encodes the specified RequestSetOption message. Does not implicitly {@link tendermint.abci.RequestSetOption.verify|verify} messages.
             * @param message RequestSetOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestSetOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestSetOption message, length delimited. Does not implicitly {@link tendermint.abci.RequestSetOption.verify|verify} messages.
             * @param message RequestSetOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestSetOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestSetOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestSetOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestSetOption;

            /**
             * Decodes a RequestSetOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestSetOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestSetOption;

            /**
             * Verifies a RequestSetOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestSetOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestSetOption
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestSetOption;

            /**
             * Creates a plain object from a RequestSetOption message. Also converts values to other types if specified.
             * @param message RequestSetOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestSetOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestSetOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestInitChain. */
        interface IRequestInitChain {

            /** RequestInitChain time */
            time?: (google.protobuf.ITimestamp|null);

            /** RequestInitChain chain_id */
            chain_id?: (string|null);

            /** RequestInitChain consensus_params */
            consensus_params?: (tendermint.abci.IConsensusParams|null);

            /** RequestInitChain validators */
            validators?: (tendermint.abci.IValidatorUpdate[]|null);

            /** RequestInitChain app_state_bytes */
            app_state_bytes?: (Uint8Array|null);

            /** RequestInitChain initial_height */
            initial_height?: (Long|null);
        }

        /** Represents a RequestInitChain. */
        class RequestInitChain implements IRequestInitChain {

            /**
             * Constructs a new RequestInitChain.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestInitChain);

            /** RequestInitChain time. */
            public time?: (google.protobuf.ITimestamp|null);

            /** RequestInitChain chain_id. */
            public chain_id: string;

            /** RequestInitChain consensus_params. */
            public consensus_params?: (tendermint.abci.IConsensusParams|null);

            /** RequestInitChain validators. */
            public validators: tendermint.abci.IValidatorUpdate[];

            /** RequestInitChain app_state_bytes. */
            public app_state_bytes: Uint8Array;

            /** RequestInitChain initial_height. */
            public initial_height: Long;

            /**
             * Encodes the specified RequestInitChain message. Does not implicitly {@link tendermint.abci.RequestInitChain.verify|verify} messages.
             * @param message RequestInitChain message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestInitChain, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestInitChain message, length delimited. Does not implicitly {@link tendermint.abci.RequestInitChain.verify|verify} messages.
             * @param message RequestInitChain message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestInitChain, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestInitChain message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestInitChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestInitChain;

            /**
             * Decodes a RequestInitChain message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestInitChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestInitChain;

            /**
             * Verifies a RequestInitChain message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestInitChain message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestInitChain
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestInitChain;

            /**
             * Creates a plain object from a RequestInitChain message. Also converts values to other types if specified.
             * @param message RequestInitChain
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestInitChain, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestInitChain to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestQuery. */
        interface IRequestQuery {

            /** RequestQuery data */
            data?: (Uint8Array|null);

            /** RequestQuery path */
            path?: (string|null);

            /** RequestQuery height */
            height?: (Long|null);

            /** RequestQuery prove */
            prove?: (boolean|null);
        }

        /** Represents a RequestQuery. */
        class RequestQuery implements IRequestQuery {

            /**
             * Constructs a new RequestQuery.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestQuery);

            /** RequestQuery data. */
            public data: Uint8Array;

            /** RequestQuery path. */
            public path: string;

            /** RequestQuery height. */
            public height: Long;

            /** RequestQuery prove. */
            public prove: boolean;

            /**
             * Encodes the specified RequestQuery message. Does not implicitly {@link tendermint.abci.RequestQuery.verify|verify} messages.
             * @param message RequestQuery message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestQuery, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestQuery message, length delimited. Does not implicitly {@link tendermint.abci.RequestQuery.verify|verify} messages.
             * @param message RequestQuery message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestQuery, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestQuery message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestQuery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestQuery;

            /**
             * Decodes a RequestQuery message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestQuery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestQuery;

            /**
             * Verifies a RequestQuery message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestQuery message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestQuery
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestQuery;

            /**
             * Creates a plain object from a RequestQuery message. Also converts values to other types if specified.
             * @param message RequestQuery
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestQuery to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestBeginBlock. */
        interface IRequestBeginBlock {

            /** RequestBeginBlock hash */
            hash?: (Uint8Array|null);

            /** RequestBeginBlock header */
            header?: (tendermint.types.IHeader|null);

            /** RequestBeginBlock last_commit_info */
            last_commit_info?: (tendermint.abci.ILastCommitInfo|null);

            /** RequestBeginBlock byzantine_validators */
            byzantine_validators?: (tendermint.abci.IEvidence[]|null);
        }

        /** Represents a RequestBeginBlock. */
        class RequestBeginBlock implements IRequestBeginBlock {

            /**
             * Constructs a new RequestBeginBlock.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestBeginBlock);

            /** RequestBeginBlock hash. */
            public hash: Uint8Array;

            /** RequestBeginBlock header. */
            public header?: (tendermint.types.IHeader|null);

            /** RequestBeginBlock last_commit_info. */
            public last_commit_info?: (tendermint.abci.ILastCommitInfo|null);

            /** RequestBeginBlock byzantine_validators. */
            public byzantine_validators: tendermint.abci.IEvidence[];

            /**
             * Encodes the specified RequestBeginBlock message. Does not implicitly {@link tendermint.abci.RequestBeginBlock.verify|verify} messages.
             * @param message RequestBeginBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestBeginBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestBeginBlock message, length delimited. Does not implicitly {@link tendermint.abci.RequestBeginBlock.verify|verify} messages.
             * @param message RequestBeginBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestBeginBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestBeginBlock message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestBeginBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestBeginBlock;

            /**
             * Decodes a RequestBeginBlock message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestBeginBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestBeginBlock;

            /**
             * Verifies a RequestBeginBlock message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestBeginBlock message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestBeginBlock
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestBeginBlock;

            /**
             * Creates a plain object from a RequestBeginBlock message. Also converts values to other types if specified.
             * @param message RequestBeginBlock
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestBeginBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestBeginBlock to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** CheckTxType enum. */
        enum CheckTxType {
            NEW = 0,
            RECHECK = 1
        }

        /** Properties of a RequestCheckTx. */
        interface IRequestCheckTx {

            /** RequestCheckTx tx */
            tx?: (Uint8Array|null);

            /** RequestCheckTx type */
            type?: (tendermint.abci.CheckTxType|null);
        }

        /** Represents a RequestCheckTx. */
        class RequestCheckTx implements IRequestCheckTx {

            /**
             * Constructs a new RequestCheckTx.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestCheckTx);

            /** RequestCheckTx tx. */
            public tx: Uint8Array;

            /** RequestCheckTx type. */
            public type: tendermint.abci.CheckTxType;

            /**
             * Encodes the specified RequestCheckTx message. Does not implicitly {@link tendermint.abci.RequestCheckTx.verify|verify} messages.
             * @param message RequestCheckTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestCheckTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestCheckTx message, length delimited. Does not implicitly {@link tendermint.abci.RequestCheckTx.verify|verify} messages.
             * @param message RequestCheckTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestCheckTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestCheckTx message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestCheckTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestCheckTx;

            /**
             * Decodes a RequestCheckTx message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestCheckTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestCheckTx;

            /**
             * Verifies a RequestCheckTx message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestCheckTx message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestCheckTx
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestCheckTx;

            /**
             * Creates a plain object from a RequestCheckTx message. Also converts values to other types if specified.
             * @param message RequestCheckTx
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestCheckTx, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestCheckTx to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestDeliverTx. */
        interface IRequestDeliverTx {

            /** RequestDeliverTx tx */
            tx?: (Uint8Array|null);
        }

        /** Represents a RequestDeliverTx. */
        class RequestDeliverTx implements IRequestDeliverTx {

            /**
             * Constructs a new RequestDeliverTx.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestDeliverTx);

            /** RequestDeliverTx tx. */
            public tx: Uint8Array;

            /**
             * Encodes the specified RequestDeliverTx message. Does not implicitly {@link tendermint.abci.RequestDeliverTx.verify|verify} messages.
             * @param message RequestDeliverTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestDeliverTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestDeliverTx message, length delimited. Does not implicitly {@link tendermint.abci.RequestDeliverTx.verify|verify} messages.
             * @param message RequestDeliverTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestDeliverTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestDeliverTx message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestDeliverTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestDeliverTx;

            /**
             * Decodes a RequestDeliverTx message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestDeliverTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestDeliverTx;

            /**
             * Verifies a RequestDeliverTx message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestDeliverTx message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestDeliverTx
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestDeliverTx;

            /**
             * Creates a plain object from a RequestDeliverTx message. Also converts values to other types if specified.
             * @param message RequestDeliverTx
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestDeliverTx, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestDeliverTx to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestEndBlock. */
        interface IRequestEndBlock {

            /** RequestEndBlock height */
            height?: (Long|null);
        }

        /** Represents a RequestEndBlock. */
        class RequestEndBlock implements IRequestEndBlock {

            /**
             * Constructs a new RequestEndBlock.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestEndBlock);

            /** RequestEndBlock height. */
            public height: Long;

            /**
             * Encodes the specified RequestEndBlock message. Does not implicitly {@link tendermint.abci.RequestEndBlock.verify|verify} messages.
             * @param message RequestEndBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestEndBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestEndBlock message, length delimited. Does not implicitly {@link tendermint.abci.RequestEndBlock.verify|verify} messages.
             * @param message RequestEndBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestEndBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestEndBlock message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestEndBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestEndBlock;

            /**
             * Decodes a RequestEndBlock message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestEndBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestEndBlock;

            /**
             * Verifies a RequestEndBlock message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestEndBlock message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestEndBlock
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestEndBlock;

            /**
             * Creates a plain object from a RequestEndBlock message. Also converts values to other types if specified.
             * @param message RequestEndBlock
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestEndBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestEndBlock to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestCommit. */
        interface IRequestCommit {
        }

        /** Represents a RequestCommit. */
        class RequestCommit implements IRequestCommit {

            /**
             * Constructs a new RequestCommit.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestCommit);

            /**
             * Encodes the specified RequestCommit message. Does not implicitly {@link tendermint.abci.RequestCommit.verify|verify} messages.
             * @param message RequestCommit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestCommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestCommit message, length delimited. Does not implicitly {@link tendermint.abci.RequestCommit.verify|verify} messages.
             * @param message RequestCommit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestCommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestCommit message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestCommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestCommit;

            /**
             * Decodes a RequestCommit message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestCommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestCommit;

            /**
             * Verifies a RequestCommit message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestCommit message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestCommit
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestCommit;

            /**
             * Creates a plain object from a RequestCommit message. Also converts values to other types if specified.
             * @param message RequestCommit
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestCommit, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestCommit to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestListSnapshots. */
        interface IRequestListSnapshots {
        }

        /** Represents a RequestListSnapshots. */
        class RequestListSnapshots implements IRequestListSnapshots {

            /**
             * Constructs a new RequestListSnapshots.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestListSnapshots);

            /**
             * Encodes the specified RequestListSnapshots message. Does not implicitly {@link tendermint.abci.RequestListSnapshots.verify|verify} messages.
             * @param message RequestListSnapshots message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestListSnapshots, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestListSnapshots message, length delimited. Does not implicitly {@link tendermint.abci.RequestListSnapshots.verify|verify} messages.
             * @param message RequestListSnapshots message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestListSnapshots, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestListSnapshots message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestListSnapshots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestListSnapshots;

            /**
             * Decodes a RequestListSnapshots message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestListSnapshots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestListSnapshots;

            /**
             * Verifies a RequestListSnapshots message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestListSnapshots message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestListSnapshots
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestListSnapshots;

            /**
             * Creates a plain object from a RequestListSnapshots message. Also converts values to other types if specified.
             * @param message RequestListSnapshots
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestListSnapshots, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestListSnapshots to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestOfferSnapshot. */
        interface IRequestOfferSnapshot {

            /** RequestOfferSnapshot snapshot */
            snapshot?: (tendermint.abci.ISnapshot|null);

            /** RequestOfferSnapshot app_hash */
            app_hash?: (Uint8Array|null);
        }

        /** Represents a RequestOfferSnapshot. */
        class RequestOfferSnapshot implements IRequestOfferSnapshot {

            /**
             * Constructs a new RequestOfferSnapshot.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestOfferSnapshot);

            /** RequestOfferSnapshot snapshot. */
            public snapshot?: (tendermint.abci.ISnapshot|null);

            /** RequestOfferSnapshot app_hash. */
            public app_hash: Uint8Array;

            /**
             * Encodes the specified RequestOfferSnapshot message. Does not implicitly {@link tendermint.abci.RequestOfferSnapshot.verify|verify} messages.
             * @param message RequestOfferSnapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestOfferSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestOfferSnapshot message, length delimited. Does not implicitly {@link tendermint.abci.RequestOfferSnapshot.verify|verify} messages.
             * @param message RequestOfferSnapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestOfferSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestOfferSnapshot message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestOfferSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestOfferSnapshot;

            /**
             * Decodes a RequestOfferSnapshot message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestOfferSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestOfferSnapshot;

            /**
             * Verifies a RequestOfferSnapshot message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestOfferSnapshot message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestOfferSnapshot
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestOfferSnapshot;

            /**
             * Creates a plain object from a RequestOfferSnapshot message. Also converts values to other types if specified.
             * @param message RequestOfferSnapshot
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestOfferSnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestOfferSnapshot to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestLoadSnapshotChunk. */
        interface IRequestLoadSnapshotChunk {

            /** RequestLoadSnapshotChunk height */
            height?: (Long|null);

            /** RequestLoadSnapshotChunk format */
            format?: (number|null);

            /** RequestLoadSnapshotChunk chunk */
            chunk?: (number|null);
        }

        /** Represents a RequestLoadSnapshotChunk. */
        class RequestLoadSnapshotChunk implements IRequestLoadSnapshotChunk {

            /**
             * Constructs a new RequestLoadSnapshotChunk.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestLoadSnapshotChunk);

            /** RequestLoadSnapshotChunk height. */
            public height: Long;

            /** RequestLoadSnapshotChunk format. */
            public format: number;

            /** RequestLoadSnapshotChunk chunk. */
            public chunk: number;

            /**
             * Encodes the specified RequestLoadSnapshotChunk message. Does not implicitly {@link tendermint.abci.RequestLoadSnapshotChunk.verify|verify} messages.
             * @param message RequestLoadSnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestLoadSnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestLoadSnapshotChunk message, length delimited. Does not implicitly {@link tendermint.abci.RequestLoadSnapshotChunk.verify|verify} messages.
             * @param message RequestLoadSnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestLoadSnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestLoadSnapshotChunk message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestLoadSnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestLoadSnapshotChunk;

            /**
             * Decodes a RequestLoadSnapshotChunk message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestLoadSnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestLoadSnapshotChunk;

            /**
             * Verifies a RequestLoadSnapshotChunk message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestLoadSnapshotChunk message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestLoadSnapshotChunk
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestLoadSnapshotChunk;

            /**
             * Creates a plain object from a RequestLoadSnapshotChunk message. Also converts values to other types if specified.
             * @param message RequestLoadSnapshotChunk
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestLoadSnapshotChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestLoadSnapshotChunk to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RequestApplySnapshotChunk. */
        interface IRequestApplySnapshotChunk {

            /** RequestApplySnapshotChunk index */
            index?: (number|null);

            /** RequestApplySnapshotChunk chunk */
            chunk?: (Uint8Array|null);

            /** RequestApplySnapshotChunk sender */
            sender?: (string|null);
        }

        /** Represents a RequestApplySnapshotChunk. */
        class RequestApplySnapshotChunk implements IRequestApplySnapshotChunk {

            /**
             * Constructs a new RequestApplySnapshotChunk.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IRequestApplySnapshotChunk);

            /** RequestApplySnapshotChunk index. */
            public index: number;

            /** RequestApplySnapshotChunk chunk. */
            public chunk: Uint8Array;

            /** RequestApplySnapshotChunk sender. */
            public sender: string;

            /**
             * Encodes the specified RequestApplySnapshotChunk message. Does not implicitly {@link tendermint.abci.RequestApplySnapshotChunk.verify|verify} messages.
             * @param message RequestApplySnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IRequestApplySnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RequestApplySnapshotChunk message, length delimited. Does not implicitly {@link tendermint.abci.RequestApplySnapshotChunk.verify|verify} messages.
             * @param message RequestApplySnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IRequestApplySnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RequestApplySnapshotChunk message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RequestApplySnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.RequestApplySnapshotChunk;

            /**
             * Decodes a RequestApplySnapshotChunk message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RequestApplySnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.RequestApplySnapshotChunk;

            /**
             * Verifies a RequestApplySnapshotChunk message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RequestApplySnapshotChunk message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RequestApplySnapshotChunk
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.RequestApplySnapshotChunk;

            /**
             * Creates a plain object from a RequestApplySnapshotChunk message. Also converts values to other types if specified.
             * @param message RequestApplySnapshotChunk
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.RequestApplySnapshotChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RequestApplySnapshotChunk to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Response. */
        interface IResponse {

            /** Response exception */
            exception?: (tendermint.abci.IResponseException|null);

            /** Response echo */
            echo?: (tendermint.abci.IResponseEcho|null);

            /** Response flush */
            flush?: (tendermint.abci.IResponseFlush|null);

            /** Response info */
            info?: (tendermint.abci.IResponseInfo|null);

            /** Response set_option */
            set_option?: (tendermint.abci.IResponseSetOption|null);

            /** Response init_chain */
            init_chain?: (tendermint.abci.IResponseInitChain|null);

            /** Response query */
            query?: (tendermint.abci.IResponseQuery|null);

            /** Response begin_block */
            begin_block?: (tendermint.abci.IResponseBeginBlock|null);

            /** Response check_tx */
            check_tx?: (tendermint.abci.IResponseCheckTx|null);

            /** Response deliver_tx */
            deliver_tx?: (tendermint.abci.IResponseDeliverTx|null);

            /** Response end_block */
            end_block?: (tendermint.abci.IResponseEndBlock|null);

            /** Response commit */
            commit?: (tendermint.abci.IResponseCommit|null);

            /** Response list_snapshots */
            list_snapshots?: (tendermint.abci.IResponseListSnapshots|null);

            /** Response offer_snapshot */
            offer_snapshot?: (tendermint.abci.IResponseOfferSnapshot|null);

            /** Response load_snapshot_chunk */
            load_snapshot_chunk?: (tendermint.abci.IResponseLoadSnapshotChunk|null);

            /** Response apply_snapshot_chunk */
            apply_snapshot_chunk?: (tendermint.abci.IResponseApplySnapshotChunk|null);
        }

        /** Represents a Response. */
        class Response implements IResponse {

            /**
             * Constructs a new Response.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponse);

            /** Response exception. */
            public exception?: (tendermint.abci.IResponseException|null);

            /** Response echo. */
            public echo?: (tendermint.abci.IResponseEcho|null);

            /** Response flush. */
            public flush?: (tendermint.abci.IResponseFlush|null);

            /** Response info. */
            public info?: (tendermint.abci.IResponseInfo|null);

            /** Response set_option. */
            public set_option?: (tendermint.abci.IResponseSetOption|null);

            /** Response init_chain. */
            public init_chain?: (tendermint.abci.IResponseInitChain|null);

            /** Response query. */
            public query?: (tendermint.abci.IResponseQuery|null);

            /** Response begin_block. */
            public begin_block?: (tendermint.abci.IResponseBeginBlock|null);

            /** Response check_tx. */
            public check_tx?: (tendermint.abci.IResponseCheckTx|null);

            /** Response deliver_tx. */
            public deliver_tx?: (tendermint.abci.IResponseDeliverTx|null);

            /** Response end_block. */
            public end_block?: (tendermint.abci.IResponseEndBlock|null);

            /** Response commit. */
            public commit?: (tendermint.abci.IResponseCommit|null);

            /** Response list_snapshots. */
            public list_snapshots?: (tendermint.abci.IResponseListSnapshots|null);

            /** Response offer_snapshot. */
            public offer_snapshot?: (tendermint.abci.IResponseOfferSnapshot|null);

            /** Response load_snapshot_chunk. */
            public load_snapshot_chunk?: (tendermint.abci.IResponseLoadSnapshotChunk|null);

            /** Response apply_snapshot_chunk. */
            public apply_snapshot_chunk?: (tendermint.abci.IResponseApplySnapshotChunk|null);

            /** Response value. */
            public value?: ("exception"|"echo"|"flush"|"info"|"set_option"|"init_chain"|"query"|"begin_block"|"check_tx"|"deliver_tx"|"end_block"|"commit"|"list_snapshots"|"offer_snapshot"|"load_snapshot_chunk"|"apply_snapshot_chunk");

            /**
             * Encodes the specified Response message. Does not implicitly {@link tendermint.abci.Response.verify|verify} messages.
             * @param message Response message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Response message, length delimited. Does not implicitly {@link tendermint.abci.Response.verify|verify} messages.
             * @param message Response message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Response message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Response
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Response;

            /**
             * Decodes a Response message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Response
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Response;

            /**
             * Verifies a Response message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Response message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Response
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Response;

            /**
             * Creates a plain object from a Response message. Also converts values to other types if specified.
             * @param message Response
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Response to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseException. */
        interface IResponseException {

            /** ResponseException error */
            error?: (string|null);
        }

        /** Represents a ResponseException. */
        class ResponseException implements IResponseException {

            /**
             * Constructs a new ResponseException.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseException);

            /** ResponseException error. */
            public error: string;

            /**
             * Encodes the specified ResponseException message. Does not implicitly {@link tendermint.abci.ResponseException.verify|verify} messages.
             * @param message ResponseException message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseException, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseException message, length delimited. Does not implicitly {@link tendermint.abci.ResponseException.verify|verify} messages.
             * @param message ResponseException message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseException, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseException message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseException
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseException;

            /**
             * Decodes a ResponseException message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseException
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseException;

            /**
             * Verifies a ResponseException message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseException message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseException
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseException;

            /**
             * Creates a plain object from a ResponseException message. Also converts values to other types if specified.
             * @param message ResponseException
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseException, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseException to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseEcho. */
        interface IResponseEcho {

            /** ResponseEcho message */
            message?: (string|null);
        }

        /** Represents a ResponseEcho. */
        class ResponseEcho implements IResponseEcho {

            /**
             * Constructs a new ResponseEcho.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseEcho);

            /** ResponseEcho message. */
            public message: string;

            /**
             * Encodes the specified ResponseEcho message. Does not implicitly {@link tendermint.abci.ResponseEcho.verify|verify} messages.
             * @param message ResponseEcho message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseEcho, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseEcho message, length delimited. Does not implicitly {@link tendermint.abci.ResponseEcho.verify|verify} messages.
             * @param message ResponseEcho message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseEcho, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseEcho message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseEcho
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseEcho;

            /**
             * Decodes a ResponseEcho message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseEcho
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseEcho;

            /**
             * Verifies a ResponseEcho message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseEcho message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseEcho
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseEcho;

            /**
             * Creates a plain object from a ResponseEcho message. Also converts values to other types if specified.
             * @param message ResponseEcho
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseEcho, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseEcho to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseFlush. */
        interface IResponseFlush {
        }

        /** Represents a ResponseFlush. */
        class ResponseFlush implements IResponseFlush {

            /**
             * Constructs a new ResponseFlush.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseFlush);

            /**
             * Encodes the specified ResponseFlush message. Does not implicitly {@link tendermint.abci.ResponseFlush.verify|verify} messages.
             * @param message ResponseFlush message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseFlush, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseFlush message, length delimited. Does not implicitly {@link tendermint.abci.ResponseFlush.verify|verify} messages.
             * @param message ResponseFlush message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseFlush, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseFlush message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseFlush
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseFlush;

            /**
             * Decodes a ResponseFlush message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseFlush
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseFlush;

            /**
             * Verifies a ResponseFlush message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseFlush message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseFlush
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseFlush;

            /**
             * Creates a plain object from a ResponseFlush message. Also converts values to other types if specified.
             * @param message ResponseFlush
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseFlush, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseFlush to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseInfo. */
        interface IResponseInfo {

            /** ResponseInfo data */
            data?: (string|null);

            /** ResponseInfo version */
            version?: (string|null);

            /** ResponseInfo app_version */
            app_version?: (Long|null);

            /** ResponseInfo last_block_height */
            last_block_height?: (Long|null);

            /** ResponseInfo last_block_app_hash */
            last_block_app_hash?: (Uint8Array|null);
        }

        /** Represents a ResponseInfo. */
        class ResponseInfo implements IResponseInfo {

            /**
             * Constructs a new ResponseInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseInfo);

            /** ResponseInfo data. */
            public data: string;

            /** ResponseInfo version. */
            public version: string;

            /** ResponseInfo app_version. */
            public app_version: Long;

            /** ResponseInfo last_block_height. */
            public last_block_height: Long;

            /** ResponseInfo last_block_app_hash. */
            public last_block_app_hash: Uint8Array;

            /**
             * Encodes the specified ResponseInfo message. Does not implicitly {@link tendermint.abci.ResponseInfo.verify|verify} messages.
             * @param message ResponseInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseInfo message, length delimited. Does not implicitly {@link tendermint.abci.ResponseInfo.verify|verify} messages.
             * @param message ResponseInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseInfo;

            /**
             * Decodes a ResponseInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseInfo;

            /**
             * Verifies a ResponseInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseInfo
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseInfo;

            /**
             * Creates a plain object from a ResponseInfo message. Also converts values to other types if specified.
             * @param message ResponseInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseSetOption. */
        interface IResponseSetOption {

            /** ResponseSetOption code */
            code?: (number|null);

            /** ResponseSetOption log */
            log?: (string|null);

            /** ResponseSetOption info */
            info?: (string|null);
        }

        /** Represents a ResponseSetOption. */
        class ResponseSetOption implements IResponseSetOption {

            /**
             * Constructs a new ResponseSetOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseSetOption);

            /** ResponseSetOption code. */
            public code: number;

            /** ResponseSetOption log. */
            public log: string;

            /** ResponseSetOption info. */
            public info: string;

            /**
             * Encodes the specified ResponseSetOption message. Does not implicitly {@link tendermint.abci.ResponseSetOption.verify|verify} messages.
             * @param message ResponseSetOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseSetOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseSetOption message, length delimited. Does not implicitly {@link tendermint.abci.ResponseSetOption.verify|verify} messages.
             * @param message ResponseSetOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseSetOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseSetOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseSetOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseSetOption;

            /**
             * Decodes a ResponseSetOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseSetOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseSetOption;

            /**
             * Verifies a ResponseSetOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseSetOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseSetOption
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseSetOption;

            /**
             * Creates a plain object from a ResponseSetOption message. Also converts values to other types if specified.
             * @param message ResponseSetOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseSetOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseSetOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseInitChain. */
        interface IResponseInitChain {

            /** ResponseInitChain consensus_params */
            consensus_params?: (tendermint.abci.IConsensusParams|null);

            /** ResponseInitChain validators */
            validators?: (tendermint.abci.IValidatorUpdate[]|null);

            /** ResponseInitChain app_hash */
            app_hash?: (Uint8Array|null);
        }

        /** Represents a ResponseInitChain. */
        class ResponseInitChain implements IResponseInitChain {

            /**
             * Constructs a new ResponseInitChain.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseInitChain);

            /** ResponseInitChain consensus_params. */
            public consensus_params?: (tendermint.abci.IConsensusParams|null);

            /** ResponseInitChain validators. */
            public validators: tendermint.abci.IValidatorUpdate[];

            /** ResponseInitChain app_hash. */
            public app_hash: Uint8Array;

            /**
             * Encodes the specified ResponseInitChain message. Does not implicitly {@link tendermint.abci.ResponseInitChain.verify|verify} messages.
             * @param message ResponseInitChain message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseInitChain, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseInitChain message, length delimited. Does not implicitly {@link tendermint.abci.ResponseInitChain.verify|verify} messages.
             * @param message ResponseInitChain message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseInitChain, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseInitChain message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseInitChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseInitChain;

            /**
             * Decodes a ResponseInitChain message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseInitChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseInitChain;

            /**
             * Verifies a ResponseInitChain message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseInitChain message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseInitChain
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseInitChain;

            /**
             * Creates a plain object from a ResponseInitChain message. Also converts values to other types if specified.
             * @param message ResponseInitChain
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseInitChain, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseInitChain to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseQuery. */
        interface IResponseQuery {

            /** ResponseQuery code */
            code?: (number|null);

            /** ResponseQuery log */
            log?: (string|null);

            /** ResponseQuery info */
            info?: (string|null);

            /** ResponseQuery index */
            index?: (Long|null);

            /** ResponseQuery key */
            key?: (Uint8Array|null);

            /** ResponseQuery value */
            value?: (Uint8Array|null);

            /** ResponseQuery proof_ops */
            proof_ops?: (tendermint.crypto.IProofOps|null);

            /** ResponseQuery height */
            height?: (Long|null);

            /** ResponseQuery codespace */
            codespace?: (string|null);
        }

        /** Represents a ResponseQuery. */
        class ResponseQuery implements IResponseQuery {

            /**
             * Constructs a new ResponseQuery.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseQuery);

            /** ResponseQuery code. */
            public code: number;

            /** ResponseQuery log. */
            public log: string;

            /** ResponseQuery info. */
            public info: string;

            /** ResponseQuery index. */
            public index: Long;

            /** ResponseQuery key. */
            public key: Uint8Array;

            /** ResponseQuery value. */
            public value: Uint8Array;

            /** ResponseQuery proof_ops. */
            public proof_ops?: (tendermint.crypto.IProofOps|null);

            /** ResponseQuery height. */
            public height: Long;

            /** ResponseQuery codespace. */
            public codespace: string;

            /**
             * Encodes the specified ResponseQuery message. Does not implicitly {@link tendermint.abci.ResponseQuery.verify|verify} messages.
             * @param message ResponseQuery message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseQuery, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseQuery message, length delimited. Does not implicitly {@link tendermint.abci.ResponseQuery.verify|verify} messages.
             * @param message ResponseQuery message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseQuery, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseQuery message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseQuery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseQuery;

            /**
             * Decodes a ResponseQuery message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseQuery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseQuery;

            /**
             * Verifies a ResponseQuery message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseQuery message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseQuery
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseQuery;

            /**
             * Creates a plain object from a ResponseQuery message. Also converts values to other types if specified.
             * @param message ResponseQuery
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseQuery to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseBeginBlock. */
        interface IResponseBeginBlock {

            /** ResponseBeginBlock events */
            events?: (tendermint.abci.IEvent[]|null);
        }

        /** Represents a ResponseBeginBlock. */
        class ResponseBeginBlock implements IResponseBeginBlock {

            /**
             * Constructs a new ResponseBeginBlock.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseBeginBlock);

            /** ResponseBeginBlock events. */
            public events: tendermint.abci.IEvent[];

            /**
             * Encodes the specified ResponseBeginBlock message. Does not implicitly {@link tendermint.abci.ResponseBeginBlock.verify|verify} messages.
             * @param message ResponseBeginBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseBeginBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseBeginBlock message, length delimited. Does not implicitly {@link tendermint.abci.ResponseBeginBlock.verify|verify} messages.
             * @param message ResponseBeginBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseBeginBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseBeginBlock message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseBeginBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseBeginBlock;

            /**
             * Decodes a ResponseBeginBlock message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseBeginBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseBeginBlock;

            /**
             * Verifies a ResponseBeginBlock message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseBeginBlock message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseBeginBlock
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseBeginBlock;

            /**
             * Creates a plain object from a ResponseBeginBlock message. Also converts values to other types if specified.
             * @param message ResponseBeginBlock
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseBeginBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseBeginBlock to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseCheckTx. */
        interface IResponseCheckTx {

            /** ResponseCheckTx code */
            code?: (number|null);

            /** ResponseCheckTx data */
            data?: (Uint8Array|null);

            /** ResponseCheckTx log */
            log?: (string|null);

            /** ResponseCheckTx info */
            info?: (string|null);

            /** ResponseCheckTx gas_wanted */
            gas_wanted?: (Long|null);

            /** ResponseCheckTx gas_used */
            gas_used?: (Long|null);

            /** ResponseCheckTx events */
            events?: (tendermint.abci.IEvent[]|null);

            /** ResponseCheckTx codespace */
            codespace?: (string|null);
        }

        /** Represents a ResponseCheckTx. */
        class ResponseCheckTx implements IResponseCheckTx {

            /**
             * Constructs a new ResponseCheckTx.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseCheckTx);

            /** ResponseCheckTx code. */
            public code: number;

            /** ResponseCheckTx data. */
            public data: Uint8Array;

            /** ResponseCheckTx log. */
            public log: string;

            /** ResponseCheckTx info. */
            public info: string;

            /** ResponseCheckTx gas_wanted. */
            public gas_wanted: Long;

            /** ResponseCheckTx gas_used. */
            public gas_used: Long;

            /** ResponseCheckTx events. */
            public events: tendermint.abci.IEvent[];

            /** ResponseCheckTx codespace. */
            public codespace: string;

            /**
             * Encodes the specified ResponseCheckTx message. Does not implicitly {@link tendermint.abci.ResponseCheckTx.verify|verify} messages.
             * @param message ResponseCheckTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseCheckTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseCheckTx message, length delimited. Does not implicitly {@link tendermint.abci.ResponseCheckTx.verify|verify} messages.
             * @param message ResponseCheckTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseCheckTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseCheckTx message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseCheckTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseCheckTx;

            /**
             * Decodes a ResponseCheckTx message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseCheckTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseCheckTx;

            /**
             * Verifies a ResponseCheckTx message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseCheckTx message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseCheckTx
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseCheckTx;

            /**
             * Creates a plain object from a ResponseCheckTx message. Also converts values to other types if specified.
             * @param message ResponseCheckTx
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseCheckTx, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseCheckTx to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseDeliverTx. */
        interface IResponseDeliverTx {

            /** ResponseDeliverTx code */
            code?: (number|null);

            /** ResponseDeliverTx data */
            data?: (Uint8Array|null);

            /** ResponseDeliverTx log */
            log?: (string|null);

            /** ResponseDeliverTx info */
            info?: (string|null);

            /** ResponseDeliverTx gas_wanted */
            gas_wanted?: (Long|null);

            /** ResponseDeliverTx gas_used */
            gas_used?: (Long|null);

            /** ResponseDeliverTx events */
            events?: (tendermint.abci.IEvent[]|null);

            /** ResponseDeliverTx codespace */
            codespace?: (string|null);
        }

        /** Represents a ResponseDeliverTx. */
        class ResponseDeliverTx implements IResponseDeliverTx {

            /**
             * Constructs a new ResponseDeliverTx.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseDeliverTx);

            /** ResponseDeliverTx code. */
            public code: number;

            /** ResponseDeliverTx data. */
            public data: Uint8Array;

            /** ResponseDeliverTx log. */
            public log: string;

            /** ResponseDeliverTx info. */
            public info: string;

            /** ResponseDeliverTx gas_wanted. */
            public gas_wanted: Long;

            /** ResponseDeliverTx gas_used. */
            public gas_used: Long;

            /** ResponseDeliverTx events. */
            public events: tendermint.abci.IEvent[];

            /** ResponseDeliverTx codespace. */
            public codespace: string;

            /**
             * Encodes the specified ResponseDeliverTx message. Does not implicitly {@link tendermint.abci.ResponseDeliverTx.verify|verify} messages.
             * @param message ResponseDeliverTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseDeliverTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseDeliverTx message, length delimited. Does not implicitly {@link tendermint.abci.ResponseDeliverTx.verify|verify} messages.
             * @param message ResponseDeliverTx message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseDeliverTx, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseDeliverTx message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseDeliverTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseDeliverTx;

            /**
             * Decodes a ResponseDeliverTx message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseDeliverTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseDeliverTx;

            /**
             * Verifies a ResponseDeliverTx message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseDeliverTx message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseDeliverTx
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseDeliverTx;

            /**
             * Creates a plain object from a ResponseDeliverTx message. Also converts values to other types if specified.
             * @param message ResponseDeliverTx
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseDeliverTx, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseDeliverTx to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseEndBlock. */
        interface IResponseEndBlock {

            /** ResponseEndBlock validator_updates */
            validator_updates?: (tendermint.abci.IValidatorUpdate[]|null);

            /** ResponseEndBlock consensus_param_updates */
            consensus_param_updates?: (tendermint.abci.IConsensusParams|null);

            /** ResponseEndBlock events */
            events?: (tendermint.abci.IEvent[]|null);
        }

        /** Represents a ResponseEndBlock. */
        class ResponseEndBlock implements IResponseEndBlock {

            /**
             * Constructs a new ResponseEndBlock.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseEndBlock);

            /** ResponseEndBlock validator_updates. */
            public validator_updates: tendermint.abci.IValidatorUpdate[];

            /** ResponseEndBlock consensus_param_updates. */
            public consensus_param_updates?: (tendermint.abci.IConsensusParams|null);

            /** ResponseEndBlock events. */
            public events: tendermint.abci.IEvent[];

            /**
             * Encodes the specified ResponseEndBlock message. Does not implicitly {@link tendermint.abci.ResponseEndBlock.verify|verify} messages.
             * @param message ResponseEndBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseEndBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseEndBlock message, length delimited. Does not implicitly {@link tendermint.abci.ResponseEndBlock.verify|verify} messages.
             * @param message ResponseEndBlock message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseEndBlock, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseEndBlock message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseEndBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseEndBlock;

            /**
             * Decodes a ResponseEndBlock message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseEndBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseEndBlock;

            /**
             * Verifies a ResponseEndBlock message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseEndBlock message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseEndBlock
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseEndBlock;

            /**
             * Creates a plain object from a ResponseEndBlock message. Also converts values to other types if specified.
             * @param message ResponseEndBlock
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseEndBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseEndBlock to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseCommit. */
        interface IResponseCommit {

            /** ResponseCommit data */
            data?: (Uint8Array|null);

            /** ResponseCommit retain_height */
            retain_height?: (Long|null);
        }

        /** Represents a ResponseCommit. */
        class ResponseCommit implements IResponseCommit {

            /**
             * Constructs a new ResponseCommit.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseCommit);

            /** ResponseCommit data. */
            public data: Uint8Array;

            /** ResponseCommit retain_height. */
            public retain_height: Long;

            /**
             * Encodes the specified ResponseCommit message. Does not implicitly {@link tendermint.abci.ResponseCommit.verify|verify} messages.
             * @param message ResponseCommit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseCommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseCommit message, length delimited. Does not implicitly {@link tendermint.abci.ResponseCommit.verify|verify} messages.
             * @param message ResponseCommit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseCommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseCommit message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseCommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseCommit;

            /**
             * Decodes a ResponseCommit message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseCommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseCommit;

            /**
             * Verifies a ResponseCommit message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseCommit message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseCommit
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseCommit;

            /**
             * Creates a plain object from a ResponseCommit message. Also converts values to other types if specified.
             * @param message ResponseCommit
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseCommit, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseCommit to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseListSnapshots. */
        interface IResponseListSnapshots {

            /** ResponseListSnapshots snapshots */
            snapshots?: (tendermint.abci.ISnapshot[]|null);
        }

        /** Represents a ResponseListSnapshots. */
        class ResponseListSnapshots implements IResponseListSnapshots {

            /**
             * Constructs a new ResponseListSnapshots.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseListSnapshots);

            /** ResponseListSnapshots snapshots. */
            public snapshots: tendermint.abci.ISnapshot[];

            /**
             * Encodes the specified ResponseListSnapshots message. Does not implicitly {@link tendermint.abci.ResponseListSnapshots.verify|verify} messages.
             * @param message ResponseListSnapshots message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseListSnapshots, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseListSnapshots message, length delimited. Does not implicitly {@link tendermint.abci.ResponseListSnapshots.verify|verify} messages.
             * @param message ResponseListSnapshots message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseListSnapshots, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseListSnapshots message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseListSnapshots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseListSnapshots;

            /**
             * Decodes a ResponseListSnapshots message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseListSnapshots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseListSnapshots;

            /**
             * Verifies a ResponseListSnapshots message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseListSnapshots message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseListSnapshots
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseListSnapshots;

            /**
             * Creates a plain object from a ResponseListSnapshots message. Also converts values to other types if specified.
             * @param message ResponseListSnapshots
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseListSnapshots, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseListSnapshots to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseOfferSnapshot. */
        interface IResponseOfferSnapshot {

            /** ResponseOfferSnapshot result */
            result?: (tendermint.abci.ResponseOfferSnapshot.Result|null);
        }

        /** Represents a ResponseOfferSnapshot. */
        class ResponseOfferSnapshot implements IResponseOfferSnapshot {

            /**
             * Constructs a new ResponseOfferSnapshot.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseOfferSnapshot);

            /** ResponseOfferSnapshot result. */
            public result: tendermint.abci.ResponseOfferSnapshot.Result;

            /**
             * Encodes the specified ResponseOfferSnapshot message. Does not implicitly {@link tendermint.abci.ResponseOfferSnapshot.verify|verify} messages.
             * @param message ResponseOfferSnapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseOfferSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseOfferSnapshot message, length delimited. Does not implicitly {@link tendermint.abci.ResponseOfferSnapshot.verify|verify} messages.
             * @param message ResponseOfferSnapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseOfferSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseOfferSnapshot message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseOfferSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseOfferSnapshot;

            /**
             * Decodes a ResponseOfferSnapshot message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseOfferSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseOfferSnapshot;

            /**
             * Verifies a ResponseOfferSnapshot message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseOfferSnapshot message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseOfferSnapshot
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseOfferSnapshot;

            /**
             * Creates a plain object from a ResponseOfferSnapshot message. Also converts values to other types if specified.
             * @param message ResponseOfferSnapshot
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseOfferSnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseOfferSnapshot to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ResponseOfferSnapshot {

            /** Result enum. */
            enum Result {
                UNKNOWN = 0,
                ACCEPT = 1,
                ABORT = 2,
                REJECT = 3,
                REJECT_FORMAT = 4,
                REJECT_SENDER = 5
            }
        }

        /** Properties of a ResponseLoadSnapshotChunk. */
        interface IResponseLoadSnapshotChunk {

            /** ResponseLoadSnapshotChunk chunk */
            chunk?: (Uint8Array|null);
        }

        /** Represents a ResponseLoadSnapshotChunk. */
        class ResponseLoadSnapshotChunk implements IResponseLoadSnapshotChunk {

            /**
             * Constructs a new ResponseLoadSnapshotChunk.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseLoadSnapshotChunk);

            /** ResponseLoadSnapshotChunk chunk. */
            public chunk: Uint8Array;

            /**
             * Encodes the specified ResponseLoadSnapshotChunk message. Does not implicitly {@link tendermint.abci.ResponseLoadSnapshotChunk.verify|verify} messages.
             * @param message ResponseLoadSnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseLoadSnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseLoadSnapshotChunk message, length delimited. Does not implicitly {@link tendermint.abci.ResponseLoadSnapshotChunk.verify|verify} messages.
             * @param message ResponseLoadSnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseLoadSnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseLoadSnapshotChunk message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseLoadSnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseLoadSnapshotChunk;

            /**
             * Decodes a ResponseLoadSnapshotChunk message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseLoadSnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseLoadSnapshotChunk;

            /**
             * Verifies a ResponseLoadSnapshotChunk message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseLoadSnapshotChunk message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseLoadSnapshotChunk
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseLoadSnapshotChunk;

            /**
             * Creates a plain object from a ResponseLoadSnapshotChunk message. Also converts values to other types if specified.
             * @param message ResponseLoadSnapshotChunk
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseLoadSnapshotChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseLoadSnapshotChunk to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResponseApplySnapshotChunk. */
        interface IResponseApplySnapshotChunk {

            /** ResponseApplySnapshotChunk result */
            result?: (tendermint.abci.ResponseApplySnapshotChunk.Result|null);

            /** ResponseApplySnapshotChunk refetch_chunks */
            refetch_chunks?: (number[]|null);

            /** ResponseApplySnapshotChunk reject_senders */
            reject_senders?: (string[]|null);
        }

        /** Represents a ResponseApplySnapshotChunk. */
        class ResponseApplySnapshotChunk implements IResponseApplySnapshotChunk {

            /**
             * Constructs a new ResponseApplySnapshotChunk.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IResponseApplySnapshotChunk);

            /** ResponseApplySnapshotChunk result. */
            public result: tendermint.abci.ResponseApplySnapshotChunk.Result;

            /** ResponseApplySnapshotChunk refetch_chunks. */
            public refetch_chunks: number[];

            /** ResponseApplySnapshotChunk reject_senders. */
            public reject_senders: string[];

            /**
             * Encodes the specified ResponseApplySnapshotChunk message. Does not implicitly {@link tendermint.abci.ResponseApplySnapshotChunk.verify|verify} messages.
             * @param message ResponseApplySnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IResponseApplySnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResponseApplySnapshotChunk message, length delimited. Does not implicitly {@link tendermint.abci.ResponseApplySnapshotChunk.verify|verify} messages.
             * @param message ResponseApplySnapshotChunk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IResponseApplySnapshotChunk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResponseApplySnapshotChunk message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResponseApplySnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ResponseApplySnapshotChunk;

            /**
             * Decodes a ResponseApplySnapshotChunk message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResponseApplySnapshotChunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ResponseApplySnapshotChunk;

            /**
             * Verifies a ResponseApplySnapshotChunk message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResponseApplySnapshotChunk message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResponseApplySnapshotChunk
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ResponseApplySnapshotChunk;

            /**
             * Creates a plain object from a ResponseApplySnapshotChunk message. Also converts values to other types if specified.
             * @param message ResponseApplySnapshotChunk
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ResponseApplySnapshotChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseApplySnapshotChunk to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ResponseApplySnapshotChunk {

            /** Result enum. */
            enum Result {
                UNKNOWN = 0,
                ACCEPT = 1,
                ABORT = 2,
                RETRY = 3,
                RETRY_SNAPSHOT = 4,
                REJECT_SNAPSHOT = 5
            }
        }

        /** Properties of a ConsensusParams. */
        interface IConsensusParams {

            /** ConsensusParams block */
            block?: (tendermint.abci.IBlockParams|null);

            /** ConsensusParams evidence */
            evidence?: (tendermint.types.IEvidenceParams|null);

            /** ConsensusParams validator */
            validator?: (tendermint.types.IValidatorParams|null);

            /** ConsensusParams version */
            version?: (tendermint.types.IVersionParams|null);
        }

        /** Represents a ConsensusParams. */
        class ConsensusParams implements IConsensusParams {

            /**
             * Constructs a new ConsensusParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IConsensusParams);

            /** ConsensusParams block. */
            public block?: (tendermint.abci.IBlockParams|null);

            /** ConsensusParams evidence. */
            public evidence?: (tendermint.types.IEvidenceParams|null);

            /** ConsensusParams validator. */
            public validator?: (tendermint.types.IValidatorParams|null);

            /** ConsensusParams version. */
            public version?: (tendermint.types.IVersionParams|null);

            /**
             * Encodes the specified ConsensusParams message. Does not implicitly {@link tendermint.abci.ConsensusParams.verify|verify} messages.
             * @param message ConsensusParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IConsensusParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConsensusParams message, length delimited. Does not implicitly {@link tendermint.abci.ConsensusParams.verify|verify} messages.
             * @param message ConsensusParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IConsensusParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConsensusParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConsensusParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ConsensusParams;

            /**
             * Decodes a ConsensusParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConsensusParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ConsensusParams;

            /**
             * Verifies a ConsensusParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConsensusParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConsensusParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ConsensusParams;

            /**
             * Creates a plain object from a ConsensusParams message. Also converts values to other types if specified.
             * @param message ConsensusParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ConsensusParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConsensusParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BlockParams. */
        interface IBlockParams {

            /** BlockParams max_bytes */
            max_bytes?: (Long|null);

            /** BlockParams max_gas */
            max_gas?: (Long|null);
        }

        /** Represents a BlockParams. */
        class BlockParams implements IBlockParams {

            /**
             * Constructs a new BlockParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IBlockParams);

            /** BlockParams max_bytes. */
            public max_bytes: Long;

            /** BlockParams max_gas. */
            public max_gas: Long;

            /**
             * Encodes the specified BlockParams message. Does not implicitly {@link tendermint.abci.BlockParams.verify|verify} messages.
             * @param message BlockParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IBlockParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BlockParams message, length delimited. Does not implicitly {@link tendermint.abci.BlockParams.verify|verify} messages.
             * @param message BlockParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IBlockParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BlockParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BlockParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.BlockParams;

            /**
             * Decodes a BlockParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BlockParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.BlockParams;

            /**
             * Verifies a BlockParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BlockParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BlockParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.BlockParams;

            /**
             * Creates a plain object from a BlockParams message. Also converts values to other types if specified.
             * @param message BlockParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.BlockParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BlockParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LastCommitInfo. */
        interface ILastCommitInfo {

            /** LastCommitInfo round */
            round?: (number|null);

            /** LastCommitInfo votes */
            votes?: (tendermint.abci.IVoteInfo[]|null);
        }

        /** Represents a LastCommitInfo. */
        class LastCommitInfo implements ILastCommitInfo {

            /**
             * Constructs a new LastCommitInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.ILastCommitInfo);

            /** LastCommitInfo round. */
            public round: number;

            /** LastCommitInfo votes. */
            public votes: tendermint.abci.IVoteInfo[];

            /**
             * Encodes the specified LastCommitInfo message. Does not implicitly {@link tendermint.abci.LastCommitInfo.verify|verify} messages.
             * @param message LastCommitInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.ILastCommitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LastCommitInfo message, length delimited. Does not implicitly {@link tendermint.abci.LastCommitInfo.verify|verify} messages.
             * @param message LastCommitInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.ILastCommitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LastCommitInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LastCommitInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.LastCommitInfo;

            /**
             * Decodes a LastCommitInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LastCommitInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.LastCommitInfo;

            /**
             * Verifies a LastCommitInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LastCommitInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LastCommitInfo
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.LastCommitInfo;

            /**
             * Creates a plain object from a LastCommitInfo message. Also converts values to other types if specified.
             * @param message LastCommitInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.LastCommitInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LastCommitInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Event. */
        interface IEvent {

            /** Event type */
            type?: (string|null);

            /** Event attributes */
            attributes?: (tendermint.abci.IEventAttribute[]|null);
        }

        /** Represents an Event. */
        class Event implements IEvent {

            /**
             * Constructs a new Event.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IEvent);

            /** Event type. */
            public type: string;

            /** Event attributes. */
            public attributes: tendermint.abci.IEventAttribute[];

            /**
             * Encodes the specified Event message. Does not implicitly {@link tendermint.abci.Event.verify|verify} messages.
             * @param message Event message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Event message, length delimited. Does not implicitly {@link tendermint.abci.Event.verify|verify} messages.
             * @param message Event message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Event message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Event
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Event;

            /**
             * Decodes an Event message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Event
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Event;

            /**
             * Verifies an Event message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Event message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Event
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Event;

            /**
             * Creates a plain object from an Event message. Also converts values to other types if specified.
             * @param message Event
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Event to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EventAttribute. */
        interface IEventAttribute {

            /** EventAttribute key */
            key?: (Uint8Array|null);

            /** EventAttribute value */
            value?: (Uint8Array|null);

            /** EventAttribute index */
            index?: (boolean|null);
        }

        /** Represents an EventAttribute. */
        class EventAttribute implements IEventAttribute {

            /**
             * Constructs a new EventAttribute.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IEventAttribute);

            /** EventAttribute key. */
            public key: Uint8Array;

            /** EventAttribute value. */
            public value: Uint8Array;

            /** EventAttribute index. */
            public index: boolean;

            /**
             * Encodes the specified EventAttribute message. Does not implicitly {@link tendermint.abci.EventAttribute.verify|verify} messages.
             * @param message EventAttribute message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IEventAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EventAttribute message, length delimited. Does not implicitly {@link tendermint.abci.EventAttribute.verify|verify} messages.
             * @param message EventAttribute message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IEventAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EventAttribute message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EventAttribute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.EventAttribute;

            /**
             * Decodes an EventAttribute message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EventAttribute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.EventAttribute;

            /**
             * Verifies an EventAttribute message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EventAttribute message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EventAttribute
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.EventAttribute;

            /**
             * Creates a plain object from an EventAttribute message. Also converts values to other types if specified.
             * @param message EventAttribute
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.EventAttribute, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EventAttribute to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TxResult. */
        interface ITxResult {

            /** TxResult height */
            height?: (Long|null);

            /** TxResult index */
            index?: (number|null);

            /** TxResult tx */
            tx?: (Uint8Array|null);

            /** TxResult result */
            result?: (tendermint.abci.IResponseDeliverTx|null);
        }

        /** Represents a TxResult. */
        class TxResult implements ITxResult {

            /**
             * Constructs a new TxResult.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.ITxResult);

            /** TxResult height. */
            public height: Long;

            /** TxResult index. */
            public index: number;

            /** TxResult tx. */
            public tx: Uint8Array;

            /** TxResult result. */
            public result?: (tendermint.abci.IResponseDeliverTx|null);

            /**
             * Encodes the specified TxResult message. Does not implicitly {@link tendermint.abci.TxResult.verify|verify} messages.
             * @param message TxResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.ITxResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TxResult message, length delimited. Does not implicitly {@link tendermint.abci.TxResult.verify|verify} messages.
             * @param message TxResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.ITxResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TxResult message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TxResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.TxResult;

            /**
             * Decodes a TxResult message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TxResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.TxResult;

            /**
             * Verifies a TxResult message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TxResult message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TxResult
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.TxResult;

            /**
             * Creates a plain object from a TxResult message. Also converts values to other types if specified.
             * @param message TxResult
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.TxResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TxResult to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Validator. */
        interface IValidator {

            /** Validator address */
            address?: (Uint8Array|null);

            /** Validator power */
            power?: (Long|null);
        }

        /** Represents a Validator. */
        class Validator implements IValidator {

            /**
             * Constructs a new Validator.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IValidator);

            /** Validator address. */
            public address: Uint8Array;

            /** Validator power. */
            public power: Long;

            /**
             * Encodes the specified Validator message. Does not implicitly {@link tendermint.abci.Validator.verify|verify} messages.
             * @param message Validator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IValidator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Validator message, length delimited. Does not implicitly {@link tendermint.abci.Validator.verify|verify} messages.
             * @param message Validator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IValidator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Validator message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Validator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Validator;

            /**
             * Decodes a Validator message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Validator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Validator;

            /**
             * Verifies a Validator message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Validator message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Validator
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Validator;

            /**
             * Creates a plain object from a Validator message. Also converts values to other types if specified.
             * @param message Validator
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Validator, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Validator to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ValidatorUpdate. */
        interface IValidatorUpdate {

            /** ValidatorUpdate pub_key */
            pub_key?: (tendermint.crypto.IPublicKey|null);

            /** ValidatorUpdate power */
            power?: (Long|null);
        }

        /** Represents a ValidatorUpdate. */
        class ValidatorUpdate implements IValidatorUpdate {

            /**
             * Constructs a new ValidatorUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IValidatorUpdate);

            /** ValidatorUpdate pub_key. */
            public pub_key?: (tendermint.crypto.IPublicKey|null);

            /** ValidatorUpdate power. */
            public power: Long;

            /**
             * Encodes the specified ValidatorUpdate message. Does not implicitly {@link tendermint.abci.ValidatorUpdate.verify|verify} messages.
             * @param message ValidatorUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IValidatorUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ValidatorUpdate message, length delimited. Does not implicitly {@link tendermint.abci.ValidatorUpdate.verify|verify} messages.
             * @param message ValidatorUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IValidatorUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ValidatorUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ValidatorUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.ValidatorUpdate;

            /**
             * Decodes a ValidatorUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ValidatorUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.ValidatorUpdate;

            /**
             * Verifies a ValidatorUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ValidatorUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ValidatorUpdate
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.ValidatorUpdate;

            /**
             * Creates a plain object from a ValidatorUpdate message. Also converts values to other types if specified.
             * @param message ValidatorUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.ValidatorUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ValidatorUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VoteInfo. */
        interface IVoteInfo {

            /** VoteInfo validator */
            validator?: (tendermint.abci.IValidator|null);

            /** VoteInfo signed_last_block */
            signed_last_block?: (boolean|null);
        }

        /** Represents a VoteInfo. */
        class VoteInfo implements IVoteInfo {

            /**
             * Constructs a new VoteInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IVoteInfo);

            /** VoteInfo validator. */
            public validator?: (tendermint.abci.IValidator|null);

            /** VoteInfo signed_last_block. */
            public signed_last_block: boolean;

            /**
             * Encodes the specified VoteInfo message. Does not implicitly {@link tendermint.abci.VoteInfo.verify|verify} messages.
             * @param message VoteInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IVoteInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VoteInfo message, length delimited. Does not implicitly {@link tendermint.abci.VoteInfo.verify|verify} messages.
             * @param message VoteInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IVoteInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VoteInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VoteInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.VoteInfo;

            /**
             * Decodes a VoteInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VoteInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.VoteInfo;

            /**
             * Verifies a VoteInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VoteInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VoteInfo
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.VoteInfo;

            /**
             * Creates a plain object from a VoteInfo message. Also converts values to other types if specified.
             * @param message VoteInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.VoteInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VoteInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Evidence. */
        interface IEvidence {

            /** Evidence type */
            type?: (string|null);

            /** Evidence validator */
            validator?: (tendermint.abci.IValidator|null);

            /** Evidence height */
            height?: (Long|null);

            /** Evidence time */
            time?: (google.protobuf.ITimestamp|null);

            /** Evidence total_voting_power */
            total_voting_power?: (Long|null);
        }

        /** Represents an Evidence. */
        class Evidence implements IEvidence {

            /**
             * Constructs a new Evidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.IEvidence);

            /** Evidence type. */
            public type: string;

            /** Evidence validator. */
            public validator?: (tendermint.abci.IValidator|null);

            /** Evidence height. */
            public height: Long;

            /** Evidence time. */
            public time?: (google.protobuf.ITimestamp|null);

            /** Evidence total_voting_power. */
            public total_voting_power: Long;

            /**
             * Encodes the specified Evidence message. Does not implicitly {@link tendermint.abci.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Evidence message, length delimited. Does not implicitly {@link tendermint.abci.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Evidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Evidence;

            /**
             * Decodes an Evidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Evidence;

            /**
             * Verifies an Evidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Evidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Evidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Evidence;

            /**
             * Creates a plain object from an Evidence message. Also converts values to other types if specified.
             * @param message Evidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Evidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Evidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Snapshot. */
        interface ISnapshot {

            /** Snapshot height */
            height?: (Long|null);

            /** Snapshot format */
            format?: (number|null);

            /** Snapshot chunks */
            chunks?: (number|null);

            /** Snapshot hash */
            hash?: (Uint8Array|null);

            /** Snapshot metadata */
            metadata?: (Uint8Array|null);
        }

        /** Represents a Snapshot. */
        class Snapshot implements ISnapshot {

            /**
             * Constructs a new Snapshot.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.abci.ISnapshot);

            /** Snapshot height. */
            public height: Long;

            /** Snapshot format. */
            public format: number;

            /** Snapshot chunks. */
            public chunks: number;

            /** Snapshot hash. */
            public hash: Uint8Array;

            /** Snapshot metadata. */
            public metadata: Uint8Array;

            /**
             * Encodes the specified Snapshot message. Does not implicitly {@link tendermint.abci.Snapshot.verify|verify} messages.
             * @param message Snapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.abci.ISnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Snapshot message, length delimited. Does not implicitly {@link tendermint.abci.Snapshot.verify|verify} messages.
             * @param message Snapshot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.abci.ISnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Snapshot message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Snapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.abci.Snapshot;

            /**
             * Decodes a Snapshot message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Snapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.abci.Snapshot;

            /**
             * Verifies a Snapshot message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Snapshot message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Snapshot
             */
            public static fromObject(object: { [k: string]: any }): tendermint.abci.Snapshot;

            /**
             * Creates a plain object from a Snapshot message. Also converts values to other types if specified.
             * @param message Snapshot
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.abci.Snapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Snapshot to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a ABCIApplication */
        class ABCIApplication extends $protobuf.rpc.Service {

            /**
             * Constructs a new ABCIApplication service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Echo.
             * @param request RequestEcho message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseEcho
             */
            public echo(request: tendermint.abci.IRequestEcho, callback: tendermint.abci.ABCIApplication.EchoCallback): void;

            /**
             * Calls Echo.
             * @param request RequestEcho message or plain object
             * @returns Promise
             */
            public echo(request: tendermint.abci.IRequestEcho): Promise<tendermint.abci.ResponseEcho>;

            /**
             * Calls Flush.
             * @param request RequestFlush message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseFlush
             */
            public flush(request: tendermint.abci.IRequestFlush, callback: tendermint.abci.ABCIApplication.FlushCallback): void;

            /**
             * Calls Flush.
             * @param request RequestFlush message or plain object
             * @returns Promise
             */
            public flush(request: tendermint.abci.IRequestFlush): Promise<tendermint.abci.ResponseFlush>;

            /**
             * Calls Info.
             * @param request RequestInfo message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseInfo
             */
            public info(request: tendermint.abci.IRequestInfo, callback: tendermint.abci.ABCIApplication.InfoCallback): void;

            /**
             * Calls Info.
             * @param request RequestInfo message or plain object
             * @returns Promise
             */
            public info(request: tendermint.abci.IRequestInfo): Promise<tendermint.abci.ResponseInfo>;

            /**
             * Calls SetOption.
             * @param request RequestSetOption message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseSetOption
             */
            public setOption(request: tendermint.abci.IRequestSetOption, callback: tendermint.abci.ABCIApplication.SetOptionCallback): void;

            /**
             * Calls SetOption.
             * @param request RequestSetOption message or plain object
             * @returns Promise
             */
            public setOption(request: tendermint.abci.IRequestSetOption): Promise<tendermint.abci.ResponseSetOption>;

            /**
             * Calls DeliverTx.
             * @param request RequestDeliverTx message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseDeliverTx
             */
            public deliverTx(request: tendermint.abci.IRequestDeliverTx, callback: tendermint.abci.ABCIApplication.DeliverTxCallback): void;

            /**
             * Calls DeliverTx.
             * @param request RequestDeliverTx message or plain object
             * @returns Promise
             */
            public deliverTx(request: tendermint.abci.IRequestDeliverTx): Promise<tendermint.abci.ResponseDeliverTx>;

            /**
             * Calls CheckTx.
             * @param request RequestCheckTx message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseCheckTx
             */
            public checkTx(request: tendermint.abci.IRequestCheckTx, callback: tendermint.abci.ABCIApplication.CheckTxCallback): void;

            /**
             * Calls CheckTx.
             * @param request RequestCheckTx message or plain object
             * @returns Promise
             */
            public checkTx(request: tendermint.abci.IRequestCheckTx): Promise<tendermint.abci.ResponseCheckTx>;

            /**
             * Calls Query.
             * @param request RequestQuery message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseQuery
             */
            public query(request: tendermint.abci.IRequestQuery, callback: tendermint.abci.ABCIApplication.QueryCallback): void;

            /**
             * Calls Query.
             * @param request RequestQuery message or plain object
             * @returns Promise
             */
            public query(request: tendermint.abci.IRequestQuery): Promise<tendermint.abci.ResponseQuery>;

            /**
             * Calls Commit.
             * @param request RequestCommit message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseCommit
             */
            public commit(request: tendermint.abci.IRequestCommit, callback: tendermint.abci.ABCIApplication.CommitCallback): void;

            /**
             * Calls Commit.
             * @param request RequestCommit message or plain object
             * @returns Promise
             */
            public commit(request: tendermint.abci.IRequestCommit): Promise<tendermint.abci.ResponseCommit>;

            /**
             * Calls InitChain.
             * @param request RequestInitChain message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseInitChain
             */
            public initChain(request: tendermint.abci.IRequestInitChain, callback: tendermint.abci.ABCIApplication.InitChainCallback): void;

            /**
             * Calls InitChain.
             * @param request RequestInitChain message or plain object
             * @returns Promise
             */
            public initChain(request: tendermint.abci.IRequestInitChain): Promise<tendermint.abci.ResponseInitChain>;

            /**
             * Calls BeginBlock.
             * @param request RequestBeginBlock message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseBeginBlock
             */
            public beginBlock(request: tendermint.abci.IRequestBeginBlock, callback: tendermint.abci.ABCIApplication.BeginBlockCallback): void;

            /**
             * Calls BeginBlock.
             * @param request RequestBeginBlock message or plain object
             * @returns Promise
             */
            public beginBlock(request: tendermint.abci.IRequestBeginBlock): Promise<tendermint.abci.ResponseBeginBlock>;

            /**
             * Calls EndBlock.
             * @param request RequestEndBlock message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseEndBlock
             */
            public endBlock(request: tendermint.abci.IRequestEndBlock, callback: tendermint.abci.ABCIApplication.EndBlockCallback): void;

            /**
             * Calls EndBlock.
             * @param request RequestEndBlock message or plain object
             * @returns Promise
             */
            public endBlock(request: tendermint.abci.IRequestEndBlock): Promise<tendermint.abci.ResponseEndBlock>;

            /**
             * Calls ListSnapshots.
             * @param request RequestListSnapshots message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseListSnapshots
             */
            public listSnapshots(request: tendermint.abci.IRequestListSnapshots, callback: tendermint.abci.ABCIApplication.ListSnapshotsCallback): void;

            /**
             * Calls ListSnapshots.
             * @param request RequestListSnapshots message or plain object
             * @returns Promise
             */
            public listSnapshots(request: tendermint.abci.IRequestListSnapshots): Promise<tendermint.abci.ResponseListSnapshots>;

            /**
             * Calls OfferSnapshot.
             * @param request RequestOfferSnapshot message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseOfferSnapshot
             */
            public offerSnapshot(request: tendermint.abci.IRequestOfferSnapshot, callback: tendermint.abci.ABCIApplication.OfferSnapshotCallback): void;

            /**
             * Calls OfferSnapshot.
             * @param request RequestOfferSnapshot message or plain object
             * @returns Promise
             */
            public offerSnapshot(request: tendermint.abci.IRequestOfferSnapshot): Promise<tendermint.abci.ResponseOfferSnapshot>;

            /**
             * Calls LoadSnapshotChunk.
             * @param request RequestLoadSnapshotChunk message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseLoadSnapshotChunk
             */
            public loadSnapshotChunk(request: tendermint.abci.IRequestLoadSnapshotChunk, callback: tendermint.abci.ABCIApplication.LoadSnapshotChunkCallback): void;

            /**
             * Calls LoadSnapshotChunk.
             * @param request RequestLoadSnapshotChunk message or plain object
             * @returns Promise
             */
            public loadSnapshotChunk(request: tendermint.abci.IRequestLoadSnapshotChunk): Promise<tendermint.abci.ResponseLoadSnapshotChunk>;

            /**
             * Calls ApplySnapshotChunk.
             * @param request RequestApplySnapshotChunk message or plain object
             * @param callback Node-style callback called with the error, if any, and ResponseApplySnapshotChunk
             */
            public applySnapshotChunk(request: tendermint.abci.IRequestApplySnapshotChunk, callback: tendermint.abci.ABCIApplication.ApplySnapshotChunkCallback): void;

            /**
             * Calls ApplySnapshotChunk.
             * @param request RequestApplySnapshotChunk message or plain object
             * @returns Promise
             */
            public applySnapshotChunk(request: tendermint.abci.IRequestApplySnapshotChunk): Promise<tendermint.abci.ResponseApplySnapshotChunk>;
        }

        namespace ABCIApplication {

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#echo}.
             * @param error Error, if any
             * @param [response] ResponseEcho
             */
            type EchoCallback = (error: (Error|null), response?: tendermint.abci.ResponseEcho) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#flush}.
             * @param error Error, if any
             * @param [response] ResponseFlush
             */
            type FlushCallback = (error: (Error|null), response?: tendermint.abci.ResponseFlush) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#info}.
             * @param error Error, if any
             * @param [response] ResponseInfo
             */
            type InfoCallback = (error: (Error|null), response?: tendermint.abci.ResponseInfo) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#setOption}.
             * @param error Error, if any
             * @param [response] ResponseSetOption
             */
            type SetOptionCallback = (error: (Error|null), response?: tendermint.abci.ResponseSetOption) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#deliverTx}.
             * @param error Error, if any
             * @param [response] ResponseDeliverTx
             */
            type DeliverTxCallback = (error: (Error|null), response?: tendermint.abci.ResponseDeliverTx) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#checkTx}.
             * @param error Error, if any
             * @param [response] ResponseCheckTx
             */
            type CheckTxCallback = (error: (Error|null), response?: tendermint.abci.ResponseCheckTx) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#query}.
             * @param error Error, if any
             * @param [response] ResponseQuery
             */
            type QueryCallback = (error: (Error|null), response?: tendermint.abci.ResponseQuery) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#commit}.
             * @param error Error, if any
             * @param [response] ResponseCommit
             */
            type CommitCallback = (error: (Error|null), response?: tendermint.abci.ResponseCommit) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#initChain}.
             * @param error Error, if any
             * @param [response] ResponseInitChain
             */
            type InitChainCallback = (error: (Error|null), response?: tendermint.abci.ResponseInitChain) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#beginBlock}.
             * @param error Error, if any
             * @param [response] ResponseBeginBlock
             */
            type BeginBlockCallback = (error: (Error|null), response?: tendermint.abci.ResponseBeginBlock) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#endBlock}.
             * @param error Error, if any
             * @param [response] ResponseEndBlock
             */
            type EndBlockCallback = (error: (Error|null), response?: tendermint.abci.ResponseEndBlock) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#listSnapshots}.
             * @param error Error, if any
             * @param [response] ResponseListSnapshots
             */
            type ListSnapshotsCallback = (error: (Error|null), response?: tendermint.abci.ResponseListSnapshots) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#offerSnapshot}.
             * @param error Error, if any
             * @param [response] ResponseOfferSnapshot
             */
            type OfferSnapshotCallback = (error: (Error|null), response?: tendermint.abci.ResponseOfferSnapshot) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#loadSnapshotChunk}.
             * @param error Error, if any
             * @param [response] ResponseLoadSnapshotChunk
             */
            type LoadSnapshotChunkCallback = (error: (Error|null), response?: tendermint.abci.ResponseLoadSnapshotChunk) => void;

            /**
             * Callback as used by {@link tendermint.abci.ABCIApplication#applySnapshotChunk}.
             * @param error Error, if any
             * @param [response] ResponseApplySnapshotChunk
             */
            type ApplySnapshotChunkCallback = (error: (Error|null), response?: tendermint.abci.ResponseApplySnapshotChunk) => void;
        }
    }

    /** Namespace crypto. */
    namespace crypto {

        /** Properties of a Proof. */
        interface IProof {

            /** Proof total */
            total?: (Long|null);

            /** Proof index */
            index?: (Long|null);

            /** Proof leaf_hash */
            leaf_hash?: (Uint8Array|null);

            /** Proof aunts */
            aunts?: (Uint8Array[]|null);
        }

        /** Represents a Proof. */
        class Proof implements IProof {

            /**
             * Constructs a new Proof.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IProof);

            /** Proof total. */
            public total: Long;

            /** Proof index. */
            public index: Long;

            /** Proof leaf_hash. */
            public leaf_hash: Uint8Array;

            /** Proof aunts. */
            public aunts: Uint8Array[];

            /**
             * Encodes the specified Proof message. Does not implicitly {@link tendermint.crypto.Proof.verify|verify} messages.
             * @param message Proof message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IProof, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Proof message, length delimited. Does not implicitly {@link tendermint.crypto.Proof.verify|verify} messages.
             * @param message Proof message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IProof, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Proof message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Proof
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.Proof;

            /**
             * Decodes a Proof message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Proof
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.Proof;

            /**
             * Verifies a Proof message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Proof message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Proof
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.Proof;

            /**
             * Creates a plain object from a Proof message. Also converts values to other types if specified.
             * @param message Proof
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.Proof, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Proof to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ValueOp. */
        interface IValueOp {

            /** ValueOp key */
            key?: (Uint8Array|null);

            /** ValueOp proof */
            proof?: (tendermint.crypto.IProof|null);
        }

        /** Represents a ValueOp. */
        class ValueOp implements IValueOp {

            /**
             * Constructs a new ValueOp.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IValueOp);

            /** ValueOp key. */
            public key: Uint8Array;

            /** ValueOp proof. */
            public proof?: (tendermint.crypto.IProof|null);

            /**
             * Encodes the specified ValueOp message. Does not implicitly {@link tendermint.crypto.ValueOp.verify|verify} messages.
             * @param message ValueOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IValueOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ValueOp message, length delimited. Does not implicitly {@link tendermint.crypto.ValueOp.verify|verify} messages.
             * @param message ValueOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IValueOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ValueOp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ValueOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.ValueOp;

            /**
             * Decodes a ValueOp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ValueOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.ValueOp;

            /**
             * Verifies a ValueOp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ValueOp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ValueOp
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.ValueOp;

            /**
             * Creates a plain object from a ValueOp message. Also converts values to other types if specified.
             * @param message ValueOp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.ValueOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ValueOp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DominoOp. */
        interface IDominoOp {

            /** DominoOp key */
            key?: (string|null);

            /** DominoOp input */
            input?: (string|null);

            /** DominoOp output */
            output?: (string|null);
        }

        /** Represents a DominoOp. */
        class DominoOp implements IDominoOp {

            /**
             * Constructs a new DominoOp.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IDominoOp);

            /** DominoOp key. */
            public key: string;

            /** DominoOp input. */
            public input: string;

            /** DominoOp output. */
            public output: string;

            /**
             * Encodes the specified DominoOp message. Does not implicitly {@link tendermint.crypto.DominoOp.verify|verify} messages.
             * @param message DominoOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IDominoOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DominoOp message, length delimited. Does not implicitly {@link tendermint.crypto.DominoOp.verify|verify} messages.
             * @param message DominoOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IDominoOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DominoOp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DominoOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.DominoOp;

            /**
             * Decodes a DominoOp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DominoOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.DominoOp;

            /**
             * Verifies a DominoOp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DominoOp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DominoOp
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.DominoOp;

            /**
             * Creates a plain object from a DominoOp message. Also converts values to other types if specified.
             * @param message DominoOp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.DominoOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DominoOp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ProofOp. */
        interface IProofOp {

            /** ProofOp type */
            type?: (string|null);

            /** ProofOp key */
            key?: (Uint8Array|null);

            /** ProofOp data */
            data?: (Uint8Array|null);
        }

        /** Represents a ProofOp. */
        class ProofOp implements IProofOp {

            /**
             * Constructs a new ProofOp.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IProofOp);

            /** ProofOp type. */
            public type: string;

            /** ProofOp key. */
            public key: Uint8Array;

            /** ProofOp data. */
            public data: Uint8Array;

            /**
             * Encodes the specified ProofOp message. Does not implicitly {@link tendermint.crypto.ProofOp.verify|verify} messages.
             * @param message ProofOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IProofOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ProofOp message, length delimited. Does not implicitly {@link tendermint.crypto.ProofOp.verify|verify} messages.
             * @param message ProofOp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IProofOp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProofOp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ProofOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.ProofOp;

            /**
             * Decodes a ProofOp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ProofOp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.ProofOp;

            /**
             * Verifies a ProofOp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ProofOp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProofOp
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.ProofOp;

            /**
             * Creates a plain object from a ProofOp message. Also converts values to other types if specified.
             * @param message ProofOp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.ProofOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProofOp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ProofOps. */
        interface IProofOps {

            /** ProofOps ops */
            ops?: (tendermint.crypto.IProofOp[]|null);
        }

        /** Represents a ProofOps. */
        class ProofOps implements IProofOps {

            /**
             * Constructs a new ProofOps.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IProofOps);

            /** ProofOps ops. */
            public ops: tendermint.crypto.IProofOp[];

            /**
             * Encodes the specified ProofOps message. Does not implicitly {@link tendermint.crypto.ProofOps.verify|verify} messages.
             * @param message ProofOps message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IProofOps, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ProofOps message, length delimited. Does not implicitly {@link tendermint.crypto.ProofOps.verify|verify} messages.
             * @param message ProofOps message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IProofOps, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProofOps message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ProofOps
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.ProofOps;

            /**
             * Decodes a ProofOps message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ProofOps
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.ProofOps;

            /**
             * Verifies a ProofOps message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ProofOps message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProofOps
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.ProofOps;

            /**
             * Creates a plain object from a ProofOps message. Also converts values to other types if specified.
             * @param message ProofOps
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.ProofOps, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProofOps to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PublicKey. */
        interface IPublicKey {

            /** PublicKey ed25519 */
            ed25519?: (Uint8Array|null);
        }

        /** Represents a PublicKey. */
        class PublicKey implements IPublicKey {

            /**
             * Constructs a new PublicKey.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IPublicKey);

            /** PublicKey ed25519. */
            public ed25519?: (Uint8Array|null);

            /** PublicKey sum. */
            public sum?: "ed25519";

            /**
             * Encodes the specified PublicKey message. Does not implicitly {@link tendermint.crypto.PublicKey.verify|verify} messages.
             * @param message PublicKey message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PublicKey message, length delimited. Does not implicitly {@link tendermint.crypto.PublicKey.verify|verify} messages.
             * @param message PublicKey message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PublicKey message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PublicKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.PublicKey;

            /**
             * Decodes a PublicKey message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PublicKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.PublicKey;

            /**
             * Verifies a PublicKey message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PublicKey message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PublicKey
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.PublicKey;

            /**
             * Creates a plain object from a PublicKey message. Also converts values to other types if specified.
             * @param message PublicKey
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.PublicKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PublicKey to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PrivateKey. */
        interface IPrivateKey {

            /** PrivateKey ed25519 */
            ed25519?: (Uint8Array|null);
        }

        /** Represents a PrivateKey. */
        class PrivateKey implements IPrivateKey {

            /**
             * Constructs a new PrivateKey.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.crypto.IPrivateKey);

            /** PrivateKey ed25519. */
            public ed25519?: (Uint8Array|null);

            /** PrivateKey sum. */
            public sum?: "ed25519";

            /**
             * Encodes the specified PrivateKey message. Does not implicitly {@link tendermint.crypto.PrivateKey.verify|verify} messages.
             * @param message PrivateKey message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.crypto.IPrivateKey, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrivateKey message, length delimited. Does not implicitly {@link tendermint.crypto.PrivateKey.verify|verify} messages.
             * @param message PrivateKey message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.crypto.IPrivateKey, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrivateKey message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrivateKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.crypto.PrivateKey;

            /**
             * Decodes a PrivateKey message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrivateKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.crypto.PrivateKey;

            /**
             * Verifies a PrivateKey message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrivateKey message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrivateKey
             */
            public static fromObject(object: { [k: string]: any }): tendermint.crypto.PrivateKey;

            /**
             * Creates a plain object from a PrivateKey message. Also converts values to other types if specified.
             * @param message PrivateKey
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.crypto.PrivateKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrivateKey to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace libs. */
    namespace libs {

        /** Namespace bits. */
        namespace bits {

            /** Properties of a BitArray. */
            interface IBitArray {

                /** BitArray bits */
                bits?: (Long|null);

                /** BitArray elems */
                elems?: (Long[]|null);
            }

            /** Represents a BitArray. */
            class BitArray implements IBitArray {

                /**
                 * Constructs a new BitArray.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tendermint.libs.bits.IBitArray);

                /** BitArray bits. */
                public bits: Long;

                /** BitArray elems. */
                public elems: Long[];

                /**
                 * Encodes the specified BitArray message. Does not implicitly {@link tendermint.libs.bits.BitArray.verify|verify} messages.
                 * @param message BitArray message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tendermint.libs.bits.IBitArray, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BitArray message, length delimited. Does not implicitly {@link tendermint.libs.bits.BitArray.verify|verify} messages.
                 * @param message BitArray message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tendermint.libs.bits.IBitArray, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BitArray message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BitArray
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.libs.bits.BitArray;

                /**
                 * Decodes a BitArray message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BitArray
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.libs.bits.BitArray;

                /**
                 * Verifies a BitArray message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BitArray message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BitArray
                 */
                public static fromObject(object: { [k: string]: any }): tendermint.libs.bits.BitArray;

                /**
                 * Creates a plain object from a BitArray message. Also converts values to other types if specified.
                 * @param message BitArray
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tendermint.libs.bits.BitArray, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BitArray to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace types. */
    namespace types {

        /** BlockIDFlag enum. */
        enum BlockIDFlag {
            BLOCK_ID_FLAG_UNKNOWN = 0,
            BLOCK_ID_FLAG_ABSENT = 1,
            BLOCK_ID_FLAG_COMMIT = 2,
            BLOCK_ID_FLAG_NIL = 3
        }

        /** SignedMsgType enum. */
        enum SignedMsgType {
            SIGNED_MSG_TYPE_UNKNOWN = 0,
            SIGNED_MSG_TYPE_PREVOTE = 1,
            SIGNED_MSG_TYPE_PRECOMMIT = 2,
            SIGNED_MSG_TYPE_PROPOSAL = 32
        }

        /** Properties of a PartSetHeader. */
        interface IPartSetHeader {

            /** PartSetHeader total */
            total?: (number|null);

            /** PartSetHeader hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a PartSetHeader. */
        class PartSetHeader implements IPartSetHeader {

            /**
             * Constructs a new PartSetHeader.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IPartSetHeader);

            /** PartSetHeader total. */
            public total: number;

            /** PartSetHeader hash. */
            public hash: Uint8Array;

            /**
             * Encodes the specified PartSetHeader message. Does not implicitly {@link tendermint.types.PartSetHeader.verify|verify} messages.
             * @param message PartSetHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IPartSetHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PartSetHeader message, length delimited. Does not implicitly {@link tendermint.types.PartSetHeader.verify|verify} messages.
             * @param message PartSetHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IPartSetHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PartSetHeader message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PartSetHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.PartSetHeader;

            /**
             * Decodes a PartSetHeader message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PartSetHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.PartSetHeader;

            /**
             * Verifies a PartSetHeader message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PartSetHeader message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PartSetHeader
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.PartSetHeader;

            /**
             * Creates a plain object from a PartSetHeader message. Also converts values to other types if specified.
             * @param message PartSetHeader
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.PartSetHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PartSetHeader to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Part. */
        interface IPart {

            /** Part index */
            index?: (number|null);

            /** Part bytes */
            bytes?: (Uint8Array|null);

            /** Part proof */
            proof?: (tendermint.crypto.IProof|null);
        }

        /** Represents a Part. */
        class Part implements IPart {

            /**
             * Constructs a new Part.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IPart);

            /** Part index. */
            public index: number;

            /** Part bytes. */
            public bytes: Uint8Array;

            /** Part proof. */
            public proof?: (tendermint.crypto.IProof|null);

            /**
             * Encodes the specified Part message. Does not implicitly {@link tendermint.types.Part.verify|verify} messages.
             * @param message Part message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Part message, length delimited. Does not implicitly {@link tendermint.types.Part.verify|verify} messages.
             * @param message Part message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Part message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Part
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Part;

            /**
             * Decodes a Part message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Part
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Part;

            /**
             * Verifies a Part message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Part message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Part
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Part;

            /**
             * Creates a plain object from a Part message. Also converts values to other types if specified.
             * @param message Part
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Part, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Part to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BlockID. */
        interface IBlockID {

            /** BlockID hash */
            hash?: (Uint8Array|null);

            /** BlockID part_set_header */
            part_set_header?: (tendermint.types.IPartSetHeader|null);
        }

        /** Represents a BlockID. */
        class BlockID implements IBlockID {

            /**
             * Constructs a new BlockID.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IBlockID);

            /** BlockID hash. */
            public hash: Uint8Array;

            /** BlockID part_set_header. */
            public part_set_header?: (tendermint.types.IPartSetHeader|null);

            /**
             * Encodes the specified BlockID message. Does not implicitly {@link tendermint.types.BlockID.verify|verify} messages.
             * @param message BlockID message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IBlockID, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BlockID message, length delimited. Does not implicitly {@link tendermint.types.BlockID.verify|verify} messages.
             * @param message BlockID message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IBlockID, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BlockID message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BlockID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.BlockID;

            /**
             * Decodes a BlockID message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BlockID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.BlockID;

            /**
             * Verifies a BlockID message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BlockID message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BlockID
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.BlockID;

            /**
             * Creates a plain object from a BlockID message. Also converts values to other types if specified.
             * @param message BlockID
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.BlockID, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BlockID to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Header. */
        interface IHeader {

            /** Header version */
            version?: (tendermint.version.IConsensus|null);

            /** Header chain_id */
            chain_id?: (string|null);

            /** Header height */
            height?: (Long|null);

            /** Header time */
            time?: (google.protobuf.ITimestamp|null);

            /** Header last_block_id */
            last_block_id?: (tendermint.types.IBlockID|null);

            /** Header last_commit_hash */
            last_commit_hash?: (Uint8Array|null);

            /** Header data_hash */
            data_hash?: (Uint8Array|null);

            /** Header validators_hash */
            validators_hash?: (Uint8Array|null);

            /** Header next_validators_hash */
            next_validators_hash?: (Uint8Array|null);

            /** Header consensus_hash */
            consensus_hash?: (Uint8Array|null);

            /** Header app_hash */
            app_hash?: (Uint8Array|null);

            /** Header last_results_hash */
            last_results_hash?: (Uint8Array|null);

            /** Header evidence_hash */
            evidence_hash?: (Uint8Array|null);

            /** Header proposer_address */
            proposer_address?: (Uint8Array|null);
        }

        /** Represents a Header. */
        class Header implements IHeader {

            /**
             * Constructs a new Header.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IHeader);

            /** Header version. */
            public version?: (tendermint.version.IConsensus|null);

            /** Header chain_id. */
            public chain_id: string;

            /** Header height. */
            public height: Long;

            /** Header time. */
            public time?: (google.protobuf.ITimestamp|null);

            /** Header last_block_id. */
            public last_block_id?: (tendermint.types.IBlockID|null);

            /** Header last_commit_hash. */
            public last_commit_hash: Uint8Array;

            /** Header data_hash. */
            public data_hash: Uint8Array;

            /** Header validators_hash. */
            public validators_hash: Uint8Array;

            /** Header next_validators_hash. */
            public next_validators_hash: Uint8Array;

            /** Header consensus_hash. */
            public consensus_hash: Uint8Array;

            /** Header app_hash. */
            public app_hash: Uint8Array;

            /** Header last_results_hash. */
            public last_results_hash: Uint8Array;

            /** Header evidence_hash. */
            public evidence_hash: Uint8Array;

            /** Header proposer_address. */
            public proposer_address: Uint8Array;

            /**
             * Encodes the specified Header message. Does not implicitly {@link tendermint.types.Header.verify|verify} messages.
             * @param message Header message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Header message, length delimited. Does not implicitly {@link tendermint.types.Header.verify|verify} messages.
             * @param message Header message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Header message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Header;

            /**
             * Decodes a Header message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Header;

            /**
             * Verifies a Header message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Header message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Header
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Header;

            /**
             * Creates a plain object from a Header message. Also converts values to other types if specified.
             * @param message Header
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Header to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Data. */
        interface IData {

            /** Data txs */
            txs?: (Uint8Array[]|null);

            /** Data hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a Data. */
        class Data implements IData {

            /**
             * Constructs a new Data.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IData);

            /** Data txs. */
            public txs: Uint8Array[];

            /** Data hash. */
            public hash: Uint8Array;

            /**
             * Encodes the specified Data message. Does not implicitly {@link tendermint.types.Data.verify|verify} messages.
             * @param message Data message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Data message, length delimited. Does not implicitly {@link tendermint.types.Data.verify|verify} messages.
             * @param message Data message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Data message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Data
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Data;

            /**
             * Decodes a Data message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Data
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Data;

            /**
             * Verifies a Data message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Data message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Data
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Data;

            /**
             * Creates a plain object from a Data message. Also converts values to other types if specified.
             * @param message Data
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Data to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Vote. */
        interface IVote {

            /** Vote type */
            type?: (tendermint.types.SignedMsgType|null);

            /** Vote height */
            height?: (Long|null);

            /** Vote round */
            round?: (number|null);

            /** Vote block_id */
            block_id?: (tendermint.types.IBlockID|null);

            /** Vote timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);

            /** Vote validator_address */
            validator_address?: (Uint8Array|null);

            /** Vote validator_index */
            validator_index?: (number|null);

            /** Vote signature */
            signature?: (Uint8Array|null);
        }

        /** Represents a Vote. */
        class Vote implements IVote {

            /**
             * Constructs a new Vote.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IVote);

            /** Vote type. */
            public type: tendermint.types.SignedMsgType;

            /** Vote height. */
            public height: Long;

            /** Vote round. */
            public round: number;

            /** Vote block_id. */
            public block_id?: (tendermint.types.IBlockID|null);

            /** Vote timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /** Vote validator_address. */
            public validator_address: Uint8Array;

            /** Vote validator_index. */
            public validator_index: number;

            /** Vote signature. */
            public signature: Uint8Array;

            /**
             * Encodes the specified Vote message. Does not implicitly {@link tendermint.types.Vote.verify|verify} messages.
             * @param message Vote message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IVote, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Vote message, length delimited. Does not implicitly {@link tendermint.types.Vote.verify|verify} messages.
             * @param message Vote message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IVote, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Vote message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Vote;

            /**
             * Decodes a Vote message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Vote;

            /**
             * Verifies a Vote message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Vote message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vote
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Vote;

            /**
             * Creates a plain object from a Vote message. Also converts values to other types if specified.
             * @param message Vote
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Vote, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Vote to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Commit. */
        interface ICommit {

            /** Commit height */
            height?: (Long|null);

            /** Commit round */
            round?: (number|null);

            /** Commit block_id */
            block_id?: (tendermint.types.IBlockID|null);

            /** Commit signatures */
            signatures?: (tendermint.types.ICommitSig[]|null);

            /** Commit hash */
            hash?: (Uint8Array|null);

            /** Commit bit_array */
            bit_array?: (tendermint.libs.bits.IBitArray|null);
        }

        /** Represents a Commit. */
        class Commit implements ICommit {

            /**
             * Constructs a new Commit.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.ICommit);

            /** Commit height. */
            public height: Long;

            /** Commit round. */
            public round: number;

            /** Commit block_id. */
            public block_id?: (tendermint.types.IBlockID|null);

            /** Commit signatures. */
            public signatures: tendermint.types.ICommitSig[];

            /** Commit hash. */
            public hash: Uint8Array;

            /** Commit bit_array. */
            public bit_array?: (tendermint.libs.bits.IBitArray|null);

            /**
             * Encodes the specified Commit message. Does not implicitly {@link tendermint.types.Commit.verify|verify} messages.
             * @param message Commit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.ICommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Commit message, length delimited. Does not implicitly {@link tendermint.types.Commit.verify|verify} messages.
             * @param message Commit message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.ICommit, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Commit message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Commit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Commit;

            /**
             * Decodes a Commit message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Commit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Commit;

            /**
             * Verifies a Commit message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Commit message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Commit
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Commit;

            /**
             * Creates a plain object from a Commit message. Also converts values to other types if specified.
             * @param message Commit
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Commit, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Commit to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CommitSig. */
        interface ICommitSig {

            /** CommitSig block_id_flag */
            block_id_flag?: (tendermint.types.BlockIDFlag|null);

            /** CommitSig validator_address */
            validator_address?: (Uint8Array|null);

            /** CommitSig timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);

            /** CommitSig signature */
            signature?: (Uint8Array|null);
        }

        /** Represents a CommitSig. */
        class CommitSig implements ICommitSig {

            /**
             * Constructs a new CommitSig.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.ICommitSig);

            /** CommitSig block_id_flag. */
            public block_id_flag: tendermint.types.BlockIDFlag;

            /** CommitSig validator_address. */
            public validator_address: Uint8Array;

            /** CommitSig timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /** CommitSig signature. */
            public signature: Uint8Array;

            /**
             * Encodes the specified CommitSig message. Does not implicitly {@link tendermint.types.CommitSig.verify|verify} messages.
             * @param message CommitSig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.ICommitSig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CommitSig message, length delimited. Does not implicitly {@link tendermint.types.CommitSig.verify|verify} messages.
             * @param message CommitSig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.ICommitSig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommitSig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommitSig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.CommitSig;

            /**
             * Decodes a CommitSig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CommitSig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.CommitSig;

            /**
             * Verifies a CommitSig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CommitSig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommitSig
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.CommitSig;

            /**
             * Creates a plain object from a CommitSig message. Also converts values to other types if specified.
             * @param message CommitSig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.CommitSig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommitSig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Proposal. */
        interface IProposal {

            /** Proposal type */
            type?: (tendermint.types.SignedMsgType|null);

            /** Proposal height */
            height?: (Long|null);

            /** Proposal round */
            round?: (number|null);

            /** Proposal pol_round */
            pol_round?: (number|null);

            /** Proposal block_id */
            block_id?: (tendermint.types.IBlockID|null);

            /** Proposal timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);

            /** Proposal signature */
            signature?: (Uint8Array|null);
        }

        /** Represents a Proposal. */
        class Proposal implements IProposal {

            /**
             * Constructs a new Proposal.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IProposal);

            /** Proposal type. */
            public type: tendermint.types.SignedMsgType;

            /** Proposal height. */
            public height: Long;

            /** Proposal round. */
            public round: number;

            /** Proposal pol_round. */
            public pol_round: number;

            /** Proposal block_id. */
            public block_id?: (tendermint.types.IBlockID|null);

            /** Proposal timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /** Proposal signature. */
            public signature: Uint8Array;

            /**
             * Encodes the specified Proposal message. Does not implicitly {@link tendermint.types.Proposal.verify|verify} messages.
             * @param message Proposal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IProposal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Proposal message, length delimited. Does not implicitly {@link tendermint.types.Proposal.verify|verify} messages.
             * @param message Proposal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IProposal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Proposal message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Proposal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Proposal;

            /**
             * Decodes a Proposal message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Proposal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Proposal;

            /**
             * Verifies a Proposal message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Proposal message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Proposal
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Proposal;

            /**
             * Creates a plain object from a Proposal message. Also converts values to other types if specified.
             * @param message Proposal
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Proposal, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Proposal to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SignedHeader. */
        interface ISignedHeader {

            /** SignedHeader header */
            header?: (tendermint.types.IHeader|null);

            /** SignedHeader commit */
            commit?: (tendermint.types.ICommit|null);
        }

        /** Represents a SignedHeader. */
        class SignedHeader implements ISignedHeader {

            /**
             * Constructs a new SignedHeader.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.ISignedHeader);

            /** SignedHeader header. */
            public header?: (tendermint.types.IHeader|null);

            /** SignedHeader commit. */
            public commit?: (tendermint.types.ICommit|null);

            /**
             * Encodes the specified SignedHeader message. Does not implicitly {@link tendermint.types.SignedHeader.verify|verify} messages.
             * @param message SignedHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.ISignedHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SignedHeader message, length delimited. Does not implicitly {@link tendermint.types.SignedHeader.verify|verify} messages.
             * @param message SignedHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.ISignedHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SignedHeader message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SignedHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.SignedHeader;

            /**
             * Decodes a SignedHeader message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SignedHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.SignedHeader;

            /**
             * Verifies a SignedHeader message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SignedHeader message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SignedHeader
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.SignedHeader;

            /**
             * Creates a plain object from a SignedHeader message. Also converts values to other types if specified.
             * @param message SignedHeader
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.SignedHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SignedHeader to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BlockMeta. */
        interface IBlockMeta {

            /** BlockMeta block_id */
            block_id?: (tendermint.types.IBlockID|null);

            /** BlockMeta block_size */
            block_size?: (Long|null);

            /** BlockMeta header */
            header?: (tendermint.types.IHeader|null);

            /** BlockMeta num_txs */
            num_txs?: (Long|null);
        }

        /** Represents a BlockMeta. */
        class BlockMeta implements IBlockMeta {

            /**
             * Constructs a new BlockMeta.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IBlockMeta);

            /** BlockMeta block_id. */
            public block_id?: (tendermint.types.IBlockID|null);

            /** BlockMeta block_size. */
            public block_size: Long;

            /** BlockMeta header. */
            public header?: (tendermint.types.IHeader|null);

            /** BlockMeta num_txs. */
            public num_txs: Long;

            /**
             * Encodes the specified BlockMeta message. Does not implicitly {@link tendermint.types.BlockMeta.verify|verify} messages.
             * @param message BlockMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IBlockMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BlockMeta message, length delimited. Does not implicitly {@link tendermint.types.BlockMeta.verify|verify} messages.
             * @param message BlockMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IBlockMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BlockMeta message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BlockMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.BlockMeta;

            /**
             * Decodes a BlockMeta message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BlockMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.BlockMeta;

            /**
             * Verifies a BlockMeta message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BlockMeta message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BlockMeta
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.BlockMeta;

            /**
             * Creates a plain object from a BlockMeta message. Also converts values to other types if specified.
             * @param message BlockMeta
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.BlockMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BlockMeta to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TxProof. */
        interface ITxProof {

            /** TxProof root_hash */
            root_hash?: (Uint8Array|null);

            /** TxProof data */
            data?: (Uint8Array|null);

            /** TxProof proof */
            proof?: (tendermint.crypto.IProof|null);
        }

        /** Represents a TxProof. */
        class TxProof implements ITxProof {

            /**
             * Constructs a new TxProof.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.ITxProof);

            /** TxProof root_hash. */
            public root_hash: Uint8Array;

            /** TxProof data. */
            public data: Uint8Array;

            /** TxProof proof. */
            public proof?: (tendermint.crypto.IProof|null);

            /**
             * Encodes the specified TxProof message. Does not implicitly {@link tendermint.types.TxProof.verify|verify} messages.
             * @param message TxProof message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.ITxProof, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TxProof message, length delimited. Does not implicitly {@link tendermint.types.TxProof.verify|verify} messages.
             * @param message TxProof message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.ITxProof, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TxProof message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TxProof
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.TxProof;

            /**
             * Decodes a TxProof message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TxProof
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.TxProof;

            /**
             * Verifies a TxProof message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TxProof message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TxProof
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.TxProof;

            /**
             * Creates a plain object from a TxProof message. Also converts values to other types if specified.
             * @param message TxProof
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.TxProof, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TxProof to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConsensusParams. */
        interface IConsensusParams {

            /** ConsensusParams block */
            block?: (tendermint.types.IBlockParams|null);

            /** ConsensusParams evidence */
            evidence?: (tendermint.types.IEvidenceParams|null);

            /** ConsensusParams validator */
            validator?: (tendermint.types.IValidatorParams|null);

            /** ConsensusParams version */
            version?: (tendermint.types.IVersionParams|null);
        }

        /** Represents a ConsensusParams. */
        class ConsensusParams implements IConsensusParams {

            /**
             * Constructs a new ConsensusParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IConsensusParams);

            /** ConsensusParams block. */
            public block?: (tendermint.types.IBlockParams|null);

            /** ConsensusParams evidence. */
            public evidence?: (tendermint.types.IEvidenceParams|null);

            /** ConsensusParams validator. */
            public validator?: (tendermint.types.IValidatorParams|null);

            /** ConsensusParams version. */
            public version?: (tendermint.types.IVersionParams|null);

            /**
             * Encodes the specified ConsensusParams message. Does not implicitly {@link tendermint.types.ConsensusParams.verify|verify} messages.
             * @param message ConsensusParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IConsensusParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConsensusParams message, length delimited. Does not implicitly {@link tendermint.types.ConsensusParams.verify|verify} messages.
             * @param message ConsensusParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IConsensusParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConsensusParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConsensusParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.ConsensusParams;

            /**
             * Decodes a ConsensusParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConsensusParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.ConsensusParams;

            /**
             * Verifies a ConsensusParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConsensusParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConsensusParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.ConsensusParams;

            /**
             * Creates a plain object from a ConsensusParams message. Also converts values to other types if specified.
             * @param message ConsensusParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.ConsensusParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConsensusParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BlockParams. */
        interface IBlockParams {

            /** BlockParams max_bytes */
            max_bytes?: (Long|null);

            /** BlockParams max_gas */
            max_gas?: (Long|null);

            /** BlockParams time_iota_ms */
            time_iota_ms?: (Long|null);
        }

        /** Represents a BlockParams. */
        class BlockParams implements IBlockParams {

            /**
             * Constructs a new BlockParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IBlockParams);

            /** BlockParams max_bytes. */
            public max_bytes: Long;

            /** BlockParams max_gas. */
            public max_gas: Long;

            /** BlockParams time_iota_ms. */
            public time_iota_ms: Long;

            /**
             * Encodes the specified BlockParams message. Does not implicitly {@link tendermint.types.BlockParams.verify|verify} messages.
             * @param message BlockParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IBlockParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BlockParams message, length delimited. Does not implicitly {@link tendermint.types.BlockParams.verify|verify} messages.
             * @param message BlockParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IBlockParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BlockParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BlockParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.BlockParams;

            /**
             * Decodes a BlockParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BlockParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.BlockParams;

            /**
             * Verifies a BlockParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BlockParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BlockParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.BlockParams;

            /**
             * Creates a plain object from a BlockParams message. Also converts values to other types if specified.
             * @param message BlockParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.BlockParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BlockParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EvidenceParams. */
        interface IEvidenceParams {

            /** EvidenceParams max_age_num_blocks */
            max_age_num_blocks?: (Long|null);

            /** EvidenceParams max_age_duration */
            max_age_duration?: (google.protobuf.IDuration|null);

            /** EvidenceParams max_num */
            max_num?: (number|null);

            /** EvidenceParams proof_trial_period */
            proof_trial_period?: (Long|null);
        }

        /** Represents an EvidenceParams. */
        class EvidenceParams implements IEvidenceParams {

            /**
             * Constructs a new EvidenceParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IEvidenceParams);

            /** EvidenceParams max_age_num_blocks. */
            public max_age_num_blocks: Long;

            /** EvidenceParams max_age_duration. */
            public max_age_duration?: (google.protobuf.IDuration|null);

            /** EvidenceParams max_num. */
            public max_num: number;

            /** EvidenceParams proof_trial_period. */
            public proof_trial_period: Long;

            /**
             * Encodes the specified EvidenceParams message. Does not implicitly {@link tendermint.types.EvidenceParams.verify|verify} messages.
             * @param message EvidenceParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IEvidenceParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EvidenceParams message, length delimited. Does not implicitly {@link tendermint.types.EvidenceParams.verify|verify} messages.
             * @param message EvidenceParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IEvidenceParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EvidenceParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EvidenceParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.EvidenceParams;

            /**
             * Decodes an EvidenceParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EvidenceParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.EvidenceParams;

            /**
             * Verifies an EvidenceParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EvidenceParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EvidenceParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.EvidenceParams;

            /**
             * Creates a plain object from an EvidenceParams message. Also converts values to other types if specified.
             * @param message EvidenceParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.EvidenceParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EvidenceParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ValidatorParams. */
        interface IValidatorParams {

            /** ValidatorParams pub_key_types */
            pub_key_types?: (string[]|null);
        }

        /** Represents a ValidatorParams. */
        class ValidatorParams implements IValidatorParams {

            /**
             * Constructs a new ValidatorParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IValidatorParams);

            /** ValidatorParams pub_key_types. */
            public pub_key_types: string[];

            /**
             * Encodes the specified ValidatorParams message. Does not implicitly {@link tendermint.types.ValidatorParams.verify|verify} messages.
             * @param message ValidatorParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IValidatorParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ValidatorParams message, length delimited. Does not implicitly {@link tendermint.types.ValidatorParams.verify|verify} messages.
             * @param message ValidatorParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IValidatorParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ValidatorParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ValidatorParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.ValidatorParams;

            /**
             * Decodes a ValidatorParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ValidatorParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.ValidatorParams;

            /**
             * Verifies a ValidatorParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ValidatorParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ValidatorParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.ValidatorParams;

            /**
             * Creates a plain object from a ValidatorParams message. Also converts values to other types if specified.
             * @param message ValidatorParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.ValidatorParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ValidatorParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VersionParams. */
        interface IVersionParams {

            /** VersionParams app_version */
            app_version?: (Long|null);
        }

        /** Represents a VersionParams. */
        class VersionParams implements IVersionParams {

            /**
             * Constructs a new VersionParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IVersionParams);

            /** VersionParams app_version. */
            public app_version: Long;

            /**
             * Encodes the specified VersionParams message. Does not implicitly {@link tendermint.types.VersionParams.verify|verify} messages.
             * @param message VersionParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IVersionParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VersionParams message, length delimited. Does not implicitly {@link tendermint.types.VersionParams.verify|verify} messages.
             * @param message VersionParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IVersionParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VersionParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VersionParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.VersionParams;

            /**
             * Decodes a VersionParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VersionParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.VersionParams;

            /**
             * Verifies a VersionParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VersionParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VersionParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.VersionParams;

            /**
             * Creates a plain object from a VersionParams message. Also converts values to other types if specified.
             * @param message VersionParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.VersionParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VersionParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HashedParams. */
        interface IHashedParams {

            /** HashedParams block_max_bytes */
            block_max_bytes?: (Long|null);

            /** HashedParams block_max_gas */
            block_max_gas?: (Long|null);
        }

        /** Represents a HashedParams. */
        class HashedParams implements IHashedParams {

            /**
             * Constructs a new HashedParams.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IHashedParams);

            /** HashedParams block_max_bytes. */
            public block_max_bytes: Long;

            /** HashedParams block_max_gas. */
            public block_max_gas: Long;

            /**
             * Encodes the specified HashedParams message. Does not implicitly {@link tendermint.types.HashedParams.verify|verify} messages.
             * @param message HashedParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IHashedParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HashedParams message, length delimited. Does not implicitly {@link tendermint.types.HashedParams.verify|verify} messages.
             * @param message HashedParams message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IHashedParams, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HashedParams message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HashedParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.HashedParams;

            /**
             * Decodes a HashedParams message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HashedParams
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.HashedParams;

            /**
             * Verifies a HashedParams message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HashedParams message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HashedParams
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.HashedParams;

            /**
             * Creates a plain object from a HashedParams message. Also converts values to other types if specified.
             * @param message HashedParams
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.HashedParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HashedParams to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DuplicateVoteEvidence. */
        interface IDuplicateVoteEvidence {

            /** DuplicateVoteEvidence vote_a */
            vote_a?: (tendermint.types.IVote|null);

            /** DuplicateVoteEvidence vote_b */
            vote_b?: (tendermint.types.IVote|null);

            /** DuplicateVoteEvidence timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a DuplicateVoteEvidence. */
        class DuplicateVoteEvidence implements IDuplicateVoteEvidence {

            /**
             * Constructs a new DuplicateVoteEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IDuplicateVoteEvidence);

            /** DuplicateVoteEvidence vote_a. */
            public vote_a?: (tendermint.types.IVote|null);

            /** DuplicateVoteEvidence vote_b. */
            public vote_b?: (tendermint.types.IVote|null);

            /** DuplicateVoteEvidence timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /**
             * Encodes the specified DuplicateVoteEvidence message. Does not implicitly {@link tendermint.types.DuplicateVoteEvidence.verify|verify} messages.
             * @param message DuplicateVoteEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IDuplicateVoteEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DuplicateVoteEvidence message, length delimited. Does not implicitly {@link tendermint.types.DuplicateVoteEvidence.verify|verify} messages.
             * @param message DuplicateVoteEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IDuplicateVoteEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DuplicateVoteEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DuplicateVoteEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.DuplicateVoteEvidence;

            /**
             * Decodes a DuplicateVoteEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DuplicateVoteEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.DuplicateVoteEvidence;

            /**
             * Verifies a DuplicateVoteEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DuplicateVoteEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DuplicateVoteEvidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.DuplicateVoteEvidence;

            /**
             * Creates a plain object from a DuplicateVoteEvidence message. Also converts values to other types if specified.
             * @param message DuplicateVoteEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.DuplicateVoteEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DuplicateVoteEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PotentialAmnesiaEvidence. */
        interface IPotentialAmnesiaEvidence {

            /** PotentialAmnesiaEvidence vote_a */
            vote_a?: (tendermint.types.IVote|null);

            /** PotentialAmnesiaEvidence vote_b */
            vote_b?: (tendermint.types.IVote|null);

            /** PotentialAmnesiaEvidence height_stamp */
            height_stamp?: (Long|null);

            /** PotentialAmnesiaEvidence timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a PotentialAmnesiaEvidence. */
        class PotentialAmnesiaEvidence implements IPotentialAmnesiaEvidence {

            /**
             * Constructs a new PotentialAmnesiaEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IPotentialAmnesiaEvidence);

            /** PotentialAmnesiaEvidence vote_a. */
            public vote_a?: (tendermint.types.IVote|null);

            /** PotentialAmnesiaEvidence vote_b. */
            public vote_b?: (tendermint.types.IVote|null);

            /** PotentialAmnesiaEvidence height_stamp. */
            public height_stamp: Long;

            /** PotentialAmnesiaEvidence timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /**
             * Encodes the specified PotentialAmnesiaEvidence message. Does not implicitly {@link tendermint.types.PotentialAmnesiaEvidence.verify|verify} messages.
             * @param message PotentialAmnesiaEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IPotentialAmnesiaEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PotentialAmnesiaEvidence message, length delimited. Does not implicitly {@link tendermint.types.PotentialAmnesiaEvidence.verify|verify} messages.
             * @param message PotentialAmnesiaEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IPotentialAmnesiaEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PotentialAmnesiaEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PotentialAmnesiaEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.PotentialAmnesiaEvidence;

            /**
             * Decodes a PotentialAmnesiaEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PotentialAmnesiaEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.PotentialAmnesiaEvidence;

            /**
             * Verifies a PotentialAmnesiaEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PotentialAmnesiaEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PotentialAmnesiaEvidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.PotentialAmnesiaEvidence;

            /**
             * Creates a plain object from a PotentialAmnesiaEvidence message. Also converts values to other types if specified.
             * @param message PotentialAmnesiaEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.PotentialAmnesiaEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PotentialAmnesiaEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AmnesiaEvidence. */
        interface IAmnesiaEvidence {

            /** AmnesiaEvidence potential_amnesia_evidence */
            potential_amnesia_evidence?: (tendermint.types.IPotentialAmnesiaEvidence|null);

            /** AmnesiaEvidence polc */
            polc?: (tendermint.types.IProofOfLockChange|null);
        }

        /** Represents an AmnesiaEvidence. */
        class AmnesiaEvidence implements IAmnesiaEvidence {

            /**
             * Constructs a new AmnesiaEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IAmnesiaEvidence);

            /** AmnesiaEvidence potential_amnesia_evidence. */
            public potential_amnesia_evidence?: (tendermint.types.IPotentialAmnesiaEvidence|null);

            /** AmnesiaEvidence polc. */
            public polc?: (tendermint.types.IProofOfLockChange|null);

            /**
             * Encodes the specified AmnesiaEvidence message. Does not implicitly {@link tendermint.types.AmnesiaEvidence.verify|verify} messages.
             * @param message AmnesiaEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IAmnesiaEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AmnesiaEvidence message, length delimited. Does not implicitly {@link tendermint.types.AmnesiaEvidence.verify|verify} messages.
             * @param message AmnesiaEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IAmnesiaEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AmnesiaEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AmnesiaEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.AmnesiaEvidence;

            /**
             * Decodes an AmnesiaEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AmnesiaEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.AmnesiaEvidence;

            /**
             * Verifies an AmnesiaEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AmnesiaEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AmnesiaEvidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.AmnesiaEvidence;

            /**
             * Creates a plain object from an AmnesiaEvidence message. Also converts values to other types if specified.
             * @param message AmnesiaEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.AmnesiaEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AmnesiaEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConflictingHeadersEvidence. */
        interface IConflictingHeadersEvidence {

            /** ConflictingHeadersEvidence h1 */
            h1?: (tendermint.types.ISignedHeader|null);

            /** ConflictingHeadersEvidence h2 */
            h2?: (tendermint.types.ISignedHeader|null);
        }

        /** Represents a ConflictingHeadersEvidence. */
        class ConflictingHeadersEvidence implements IConflictingHeadersEvidence {

            /**
             * Constructs a new ConflictingHeadersEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IConflictingHeadersEvidence);

            /** ConflictingHeadersEvidence h1. */
            public h1?: (tendermint.types.ISignedHeader|null);

            /** ConflictingHeadersEvidence h2. */
            public h2?: (tendermint.types.ISignedHeader|null);

            /**
             * Encodes the specified ConflictingHeadersEvidence message. Does not implicitly {@link tendermint.types.ConflictingHeadersEvidence.verify|verify} messages.
             * @param message ConflictingHeadersEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IConflictingHeadersEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConflictingHeadersEvidence message, length delimited. Does not implicitly {@link tendermint.types.ConflictingHeadersEvidence.verify|verify} messages.
             * @param message ConflictingHeadersEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IConflictingHeadersEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConflictingHeadersEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConflictingHeadersEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.ConflictingHeadersEvidence;

            /**
             * Decodes a ConflictingHeadersEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConflictingHeadersEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.ConflictingHeadersEvidence;

            /**
             * Verifies a ConflictingHeadersEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConflictingHeadersEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConflictingHeadersEvidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.ConflictingHeadersEvidence;

            /**
             * Creates a plain object from a ConflictingHeadersEvidence message. Also converts values to other types if specified.
             * @param message ConflictingHeadersEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.ConflictingHeadersEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConflictingHeadersEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LunaticValidatorEvidence. */
        interface ILunaticValidatorEvidence {

            /** LunaticValidatorEvidence header */
            header?: (tendermint.types.IHeader|null);

            /** LunaticValidatorEvidence vote */
            vote?: (tendermint.types.IVote|null);

            /** LunaticValidatorEvidence invalid_header_field */
            invalid_header_field?: (string|null);

            /** LunaticValidatorEvidence timestamp */
            timestamp?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a LunaticValidatorEvidence. */
        class LunaticValidatorEvidence implements ILunaticValidatorEvidence {

            /**
             * Constructs a new LunaticValidatorEvidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.ILunaticValidatorEvidence);

            /** LunaticValidatorEvidence header. */
            public header?: (tendermint.types.IHeader|null);

            /** LunaticValidatorEvidence vote. */
            public vote?: (tendermint.types.IVote|null);

            /** LunaticValidatorEvidence invalid_header_field. */
            public invalid_header_field: string;

            /** LunaticValidatorEvidence timestamp. */
            public timestamp?: (google.protobuf.ITimestamp|null);

            /**
             * Encodes the specified LunaticValidatorEvidence message. Does not implicitly {@link tendermint.types.LunaticValidatorEvidence.verify|verify} messages.
             * @param message LunaticValidatorEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.ILunaticValidatorEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LunaticValidatorEvidence message, length delimited. Does not implicitly {@link tendermint.types.LunaticValidatorEvidence.verify|verify} messages.
             * @param message LunaticValidatorEvidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.ILunaticValidatorEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LunaticValidatorEvidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LunaticValidatorEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.LunaticValidatorEvidence;

            /**
             * Decodes a LunaticValidatorEvidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LunaticValidatorEvidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.LunaticValidatorEvidence;

            /**
             * Verifies a LunaticValidatorEvidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LunaticValidatorEvidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LunaticValidatorEvidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.LunaticValidatorEvidence;

            /**
             * Creates a plain object from a LunaticValidatorEvidence message. Also converts values to other types if specified.
             * @param message LunaticValidatorEvidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.LunaticValidatorEvidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LunaticValidatorEvidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Evidence. */
        interface IEvidence {

            /** Evidence duplicate_vote_evidence */
            duplicate_vote_evidence?: (tendermint.types.IDuplicateVoteEvidence|null);

            /** Evidence conflicting_headers_evidence */
            conflicting_headers_evidence?: (tendermint.types.IConflictingHeadersEvidence|null);

            /** Evidence lunatic_validator_evidence */
            lunatic_validator_evidence?: (tendermint.types.ILunaticValidatorEvidence|null);

            /** Evidence potential_amnesia_evidence */
            potential_amnesia_evidence?: (tendermint.types.IPotentialAmnesiaEvidence|null);

            /** Evidence amnesia_evidence */
            amnesia_evidence?: (tendermint.types.IAmnesiaEvidence|null);
        }

        /** Represents an Evidence. */
        class Evidence implements IEvidence {

            /**
             * Constructs a new Evidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IEvidence);

            /** Evidence duplicate_vote_evidence. */
            public duplicate_vote_evidence?: (tendermint.types.IDuplicateVoteEvidence|null);

            /** Evidence conflicting_headers_evidence. */
            public conflicting_headers_evidence?: (tendermint.types.IConflictingHeadersEvidence|null);

            /** Evidence lunatic_validator_evidence. */
            public lunatic_validator_evidence?: (tendermint.types.ILunaticValidatorEvidence|null);

            /** Evidence potential_amnesia_evidence. */
            public potential_amnesia_evidence?: (tendermint.types.IPotentialAmnesiaEvidence|null);

            /** Evidence amnesia_evidence. */
            public amnesia_evidence?: (tendermint.types.IAmnesiaEvidence|null);

            /** Evidence sum. */
            public sum?: ("duplicate_vote_evidence"|"conflicting_headers_evidence"|"lunatic_validator_evidence"|"potential_amnesia_evidence"|"amnesia_evidence");

            /**
             * Encodes the specified Evidence message. Does not implicitly {@link tendermint.types.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Evidence message, length delimited. Does not implicitly {@link tendermint.types.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Evidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.Evidence;

            /**
             * Decodes an Evidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.Evidence;

            /**
             * Verifies an Evidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Evidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Evidence
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.Evidence;

            /**
             * Creates a plain object from an Evidence message. Also converts values to other types if specified.
             * @param message Evidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.Evidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Evidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EvidenceData. */
        interface IEvidenceData {

            /** EvidenceData evidence */
            evidence?: (tendermint.types.IEvidence[]|null);

            /** EvidenceData hash */
            hash?: (Uint8Array|null);
        }

        /** Represents an EvidenceData. */
        class EvidenceData implements IEvidenceData {

            /**
             * Constructs a new EvidenceData.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IEvidenceData);

            /** EvidenceData evidence. */
            public evidence: tendermint.types.IEvidence[];

            /** EvidenceData hash. */
            public hash: Uint8Array;

            /**
             * Encodes the specified EvidenceData message. Does not implicitly {@link tendermint.types.EvidenceData.verify|verify} messages.
             * @param message EvidenceData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IEvidenceData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EvidenceData message, length delimited. Does not implicitly {@link tendermint.types.EvidenceData.verify|verify} messages.
             * @param message EvidenceData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IEvidenceData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EvidenceData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EvidenceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.EvidenceData;

            /**
             * Decodes an EvidenceData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EvidenceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.EvidenceData;

            /**
             * Verifies an EvidenceData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EvidenceData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EvidenceData
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.EvidenceData;

            /**
             * Creates a plain object from an EvidenceData message. Also converts values to other types if specified.
             * @param message EvidenceData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.EvidenceData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EvidenceData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ProofOfLockChange. */
        interface IProofOfLockChange {

            /** ProofOfLockChange votes */
            votes?: (tendermint.types.IVote[]|null);

            /** ProofOfLockChange pub_key */
            pub_key?: (tendermint.crypto.IPublicKey|null);
        }

        /** Represents a ProofOfLockChange. */
        class ProofOfLockChange implements IProofOfLockChange {

            /**
             * Constructs a new ProofOfLockChange.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.types.IProofOfLockChange);

            /** ProofOfLockChange votes. */
            public votes: tendermint.types.IVote[];

            /** ProofOfLockChange pub_key. */
            public pub_key?: (tendermint.crypto.IPublicKey|null);

            /**
             * Encodes the specified ProofOfLockChange message. Does not implicitly {@link tendermint.types.ProofOfLockChange.verify|verify} messages.
             * @param message ProofOfLockChange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.types.IProofOfLockChange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ProofOfLockChange message, length delimited. Does not implicitly {@link tendermint.types.ProofOfLockChange.verify|verify} messages.
             * @param message ProofOfLockChange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.types.IProofOfLockChange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProofOfLockChange message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ProofOfLockChange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.types.ProofOfLockChange;

            /**
             * Decodes a ProofOfLockChange message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ProofOfLockChange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.types.ProofOfLockChange;

            /**
             * Verifies a ProofOfLockChange message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ProofOfLockChange message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProofOfLockChange
             */
            public static fromObject(object: { [k: string]: any }): tendermint.types.ProofOfLockChange;

            /**
             * Creates a plain object from a ProofOfLockChange message. Also converts values to other types if specified.
             * @param message ProofOfLockChange
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.types.ProofOfLockChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProofOfLockChange to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace version. */
    namespace version {

        /** Properties of an App. */
        interface IApp {

            /** App protocol */
            protocol?: (Long|null);

            /** App software */
            software?: (string|null);
        }

        /** Represents an App. */
        class App implements IApp {

            /**
             * Constructs a new App.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.version.IApp);

            /** App protocol. */
            public protocol: Long;

            /** App software. */
            public software: string;

            /**
             * Encodes the specified App message. Does not implicitly {@link tendermint.version.App.verify|verify} messages.
             * @param message App message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.version.IApp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified App message, length delimited. Does not implicitly {@link tendermint.version.App.verify|verify} messages.
             * @param message App message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.version.IApp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an App message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns App
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.version.App;

            /**
             * Decodes an App message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns App
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.version.App;

            /**
             * Verifies an App message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an App message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns App
             */
            public static fromObject(object: { [k: string]: any }): tendermint.version.App;

            /**
             * Creates a plain object from an App message. Also converts values to other types if specified.
             * @param message App
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.version.App, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this App to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Consensus. */
        interface IConsensus {

            /** Consensus block */
            block?: (Long|null);

            /** Consensus app */
            app?: (Long|null);
        }

        /** Represents a Consensus. */
        class Consensus implements IConsensus {

            /**
             * Constructs a new Consensus.
             * @param [properties] Properties to set
             */
            constructor(properties?: tendermint.version.IConsensus);

            /** Consensus block. */
            public block: Long;

            /** Consensus app. */
            public app: Long;

            /**
             * Encodes the specified Consensus message. Does not implicitly {@link tendermint.version.Consensus.verify|verify} messages.
             * @param message Consensus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tendermint.version.IConsensus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Consensus message, length delimited. Does not implicitly {@link tendermint.version.Consensus.verify|verify} messages.
             * @param message Consensus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tendermint.version.IConsensus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Consensus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Consensus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tendermint.version.Consensus;

            /**
             * Decodes a Consensus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Consensus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tendermint.version.Consensus;

            /**
             * Verifies a Consensus message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Consensus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Consensus
             */
            public static fromObject(object: { [k: string]: any }): tendermint.version.Consensus;

            /**
             * Creates a plain object from a Consensus message. Also converts values to other types if specified.
             * @param message Consensus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tendermint.version.Consensus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Consensus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);
        }

        /** Represents a Http. */
        class Http implements IHttp {

            /**
             * Constructs a new Http.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttp);

            /** Http rules. */
            public rules: google.api.IHttpRule[];

            /**
             * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Http message, length delimited. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Http message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.Http;

            /**
             * Decodes a Http message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.Http;

            /**
             * Verifies a Http message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Http message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Http
             */
            public static fromObject(object: { [k: string]: any }): google.api.Http;

            /**
             * Creates a plain object from a Http message. Also converts values to other types if specified.
             * @param message Http
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.Http, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Http to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HttpRule. */
        interface IHttpRule {

            /** HttpRule get */
            get?: (string|null);

            /** HttpRule put */
            put?: (string|null);

            /** HttpRule post */
            post?: (string|null);

            /** HttpRule delete */
            "delete"?: (string|null);

            /** HttpRule patch */
            patch?: (string|null);

            /** HttpRule custom */
            custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector */
            selector?: (string|null);

            /** HttpRule body */
            body?: (string|null);

            /** HttpRule additional_bindings */
            additional_bindings?: (google.api.IHttpRule[]|null);
        }

        /** Represents a HttpRule. */
        class HttpRule implements IHttpRule {

            /**
             * Constructs a new HttpRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpRule);

            /** HttpRule get. */
            public get?: (string|null);

            /** HttpRule put. */
            public put?: (string|null);

            /** HttpRule post. */
            public post?: (string|null);

            /** HttpRule delete. */
            public delete?: (string|null);

            /** HttpRule patch. */
            public patch?: (string|null);

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector. */
            public selector: string;

            /** HttpRule body. */
            public body: string;

            /** HttpRule additional_bindings. */
            public additional_bindings: google.api.IHttpRule[];

            /** HttpRule pattern. */
            public pattern?: ("get"|"put"|"post"|"delete"|"patch"|"custom");

            /**
             * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HttpRule message, length delimited. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HttpRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.HttpRule;

            /**
             * Decodes a HttpRule message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.HttpRule;

            /**
             * Verifies a HttpRule message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HttpRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HttpRule
             */
            public static fromObject(object: { [k: string]: any }): google.api.HttpRule;

            /**
             * Creates a plain object from a HttpRule message. Also converts values to other types if specified.
             * @param message HttpRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.HttpRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HttpRule to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CustomHttpPattern. */
        interface ICustomHttpPattern {

            /** CustomHttpPattern kind */
            kind?: (string|null);

            /** CustomHttpPattern path */
            path?: (string|null);
        }

        /** Represents a CustomHttpPattern. */
        class CustomHttpPattern implements ICustomHttpPattern {

            /**
             * Constructs a new CustomHttpPattern.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICustomHttpPattern);

            /** CustomHttpPattern kind. */
            public kind: string;

            /** CustomHttpPattern path. */
            public path: string;

            /**
             * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomHttpPattern message, length delimited. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CustomHttpPattern;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CustomHttpPattern;

            /**
             * Verifies a CustomHttpPattern message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomHttpPattern message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomHttpPattern
             */
            public static fromObject(object: { [k: string]: any }): google.api.CustomHttpPattern;

            /**
             * Creates a plain object from a CustomHttpPattern message. Also converts values to other types if specified.
             * @param message CustomHttpPattern
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CustomHttpPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomHttpPattern to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HttpBody. */
        interface IHttpBody {

            /** HttpBody content_type */
            content_type?: (string|null);

            /** HttpBody data */
            data?: (Uint8Array|null);

            /** HttpBody extensions */
            extensions?: (google.protobuf.IAny[]|null);
        }

        /** Represents a HttpBody. */
        class HttpBody implements IHttpBody {

            /**
             * Constructs a new HttpBody.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpBody);

            /** HttpBody content_type. */
            public content_type: string;

            /** HttpBody data. */
            public data: Uint8Array;

            /** HttpBody extensions. */
            public extensions: google.protobuf.IAny[];

            /**
             * Encodes the specified HttpBody message. Does not implicitly {@link google.api.HttpBody.verify|verify} messages.
             * @param message HttpBody message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttpBody, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HttpBody message, length delimited. Does not implicitly {@link google.api.HttpBody.verify|verify} messages.
             * @param message HttpBody message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttpBody, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HttpBody message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HttpBody
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.HttpBody;

            /**
             * Decodes a HttpBody message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HttpBody
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.HttpBody;

            /**
             * Verifies a HttpBody message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HttpBody message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HttpBody
             */
            public static fromObject(object: { [k: string]: any }): google.api.HttpBody;

            /**
             * Creates a plain object from a HttpBody message. Also converts values to other types if specified.
             * @param message HttpBody
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.HttpBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HttpBody to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];

            /**
             * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;

            /**
             * Verifies a FileDescriptorSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @param message FileDescriptorSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto public_dependency */
            public_dependency?: (number[]|null);

            /** FileDescriptorProto weak_dependency */
            weak_dependency?: (number[]|null);

            /** FileDescriptorProto message_type */
            message_type?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enum_type */
            enum_type?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto source_code_info */
            source_code_info?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto public_dependency. */
            public public_dependency: number[];

            /** FileDescriptorProto weak_dependency. */
            public weak_dependency: number[];

            /** FileDescriptorProto message_type. */
            public message_type: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enum_type. */
            public enum_type: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto source_code_info. */
            public source_code_info?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;

            /**
             * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;

            /**
             * Verifies a FileDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @param message FileDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nested_type */
            nested_type?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enum_type */
            enum_type?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extension_range */
            extension_range?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneof_decl */
            oneof_decl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reserved_range */
            reserved_range?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reserved_name */
            reserved_name?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nested_type. */
            public nested_type: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enum_type. */
            public enum_type: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extension_range. */
            public extension_range: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneof_decl. */
            public oneof_decl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reserved_range. */
            public reserved_range: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reserved_name. */
            public reserved_name: string[];

            /**
             * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;

            /**
             * Verifies a DescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @param message DescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;

                /**
                 * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Verifies an ExtensionRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExtensionRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @param message ExtensionRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;

                /**
                 * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Verifies a ReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @param message ReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto type_name */
            type_name?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto default_value */
            default_value?: (string|null);

            /** FieldDescriptorProto oneof_index */
            oneof_index?: (number|null);

            /** FieldDescriptorProto json_name */
            json_name?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: google.protobuf.FieldDescriptorProto.Label;

            /** FieldDescriptorProto type. */
            public type: google.protobuf.FieldDescriptorProto.Type;

            /** FieldDescriptorProto type_name. */
            public type_name: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto default_value. */
            public default_value: string;

            /** FieldDescriptorProto oneof_index. */
            public oneof_index: number;

            /** FieldDescriptorProto json_name. */
            public json_name: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);

            /**
             * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;

            /**
             * Verifies a FieldDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @param message FieldDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            /** Label enum. */
            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);

            /**
             * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;

            /**
             * Verifies an OneofDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @param message OneofDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);

            /**
             * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;

            /**
             * Verifies an EnumDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);

            /**
             * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;

            /**
             * Verifies an EnumValueDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumValueDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);

            /**
             * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;

            /**
             * Verifies a ServiceDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @param message ServiceDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto input_type */
            input_type?: (string|null);

            /** MethodDescriptorProto output_type */
            output_type?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto client_streaming */
            client_streaming?: (boolean|null);

            /** MethodDescriptorProto server_streaming */
            server_streaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto input_type. */
            public input_type: string;

            /** MethodDescriptorProto output_type. */
            public output_type: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto client_streaming. */
            public client_streaming: boolean;

            /** MethodDescriptorProto server_streaming. */
            public server_streaming: boolean;

            /**
             * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;

            /**
             * Verifies a MethodDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @param message MethodDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions java_package */
            java_package?: (string|null);

            /** FileOptions java_outer_classname */
            java_outer_classname?: (string|null);

            /** FileOptions java_multiple_files */
            java_multiple_files?: (boolean|null);

            /** FileOptions java_generate_equals_and_hash */
            java_generate_equals_and_hash?: (boolean|null);

            /** FileOptions java_string_check_utf8 */
            java_string_check_utf8?: (boolean|null);

            /** FileOptions optimize_for */
            optimize_for?: (google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions go_package */
            go_package?: (string|null);

            /** FileOptions cc_generic_services */
            cc_generic_services?: (boolean|null);

            /** FileOptions java_generic_services */
            java_generic_services?: (boolean|null);

            /** FileOptions py_generic_services */
            py_generic_services?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions cc_enable_arenas */
            cc_enable_arenas?: (boolean|null);

            /** FileOptions objc_class_prefix */
            objc_class_prefix?: (string|null);

            /** FileOptions csharp_namespace */
            csharp_namespace?: (string|null);

            /** FileOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** FileOptions .gogoproto.goproto_getters_all */
            ".gogoproto.goproto_getters_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_enum_prefix_all */
            ".gogoproto.goproto_enum_prefix_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_stringer_all */
            ".gogoproto.goproto_stringer_all"?: (boolean|null);

            /** FileOptions .gogoproto.verbose_equal_all */
            ".gogoproto.verbose_equal_all"?: (boolean|null);

            /** FileOptions .gogoproto.face_all */
            ".gogoproto.face_all"?: (boolean|null);

            /** FileOptions .gogoproto.gostring_all */
            ".gogoproto.gostring_all"?: (boolean|null);

            /** FileOptions .gogoproto.populate_all */
            ".gogoproto.populate_all"?: (boolean|null);

            /** FileOptions .gogoproto.stringer_all */
            ".gogoproto.stringer_all"?: (boolean|null);

            /** FileOptions .gogoproto.onlyone_all */
            ".gogoproto.onlyone_all"?: (boolean|null);

            /** FileOptions .gogoproto.equal_all */
            ".gogoproto.equal_all"?: (boolean|null);

            /** FileOptions .gogoproto.description_all */
            ".gogoproto.description_all"?: (boolean|null);

            /** FileOptions .gogoproto.testgen_all */
            ".gogoproto.testgen_all"?: (boolean|null);

            /** FileOptions .gogoproto.benchgen_all */
            ".gogoproto.benchgen_all"?: (boolean|null);

            /** FileOptions .gogoproto.marshaler_all */
            ".gogoproto.marshaler_all"?: (boolean|null);

            /** FileOptions .gogoproto.unmarshaler_all */
            ".gogoproto.unmarshaler_all"?: (boolean|null);

            /** FileOptions .gogoproto.stable_marshaler_all */
            ".gogoproto.stable_marshaler_all"?: (boolean|null);

            /** FileOptions .gogoproto.sizer_all */
            ".gogoproto.sizer_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_enum_stringer_all */
            ".gogoproto.goproto_enum_stringer_all"?: (boolean|null);

            /** FileOptions .gogoproto.enum_stringer_all */
            ".gogoproto.enum_stringer_all"?: (boolean|null);

            /** FileOptions .gogoproto.unsafe_marshaler_all */
            ".gogoproto.unsafe_marshaler_all"?: (boolean|null);

            /** FileOptions .gogoproto.unsafe_unmarshaler_all */
            ".gogoproto.unsafe_unmarshaler_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_extensions_map_all */
            ".gogoproto.goproto_extensions_map_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_unrecognized_all */
            ".gogoproto.goproto_unrecognized_all"?: (boolean|null);

            /** FileOptions .gogoproto.gogoproto_import */
            ".gogoproto.gogoproto_import"?: (boolean|null);

            /** FileOptions .gogoproto.protosizer_all */
            ".gogoproto.protosizer_all"?: (boolean|null);

            /** FileOptions .gogoproto.compare_all */
            ".gogoproto.compare_all"?: (boolean|null);

            /** FileOptions .gogoproto.typedecl_all */
            ".gogoproto.typedecl_all"?: (boolean|null);

            /** FileOptions .gogoproto.enumdecl_all */
            ".gogoproto.enumdecl_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_registration */
            ".gogoproto.goproto_registration"?: (boolean|null);

            /** FileOptions .gogoproto.messagename_all */
            ".gogoproto.messagename_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_sizecache_all */
            ".gogoproto.goproto_sizecache_all"?: (boolean|null);

            /** FileOptions .gogoproto.goproto_unkeyed_all */
            ".gogoproto.goproto_unkeyed_all"?: (boolean|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions java_package. */
            public java_package: string;

            /** FileOptions java_outer_classname. */
            public java_outer_classname: string;

            /** FileOptions java_multiple_files. */
            public java_multiple_files: boolean;

            /** FileOptions java_generate_equals_and_hash. */
            public java_generate_equals_and_hash: boolean;

            /** FileOptions java_string_check_utf8. */
            public java_string_check_utf8: boolean;

            /** FileOptions optimize_for. */
            public optimize_for: google.protobuf.FileOptions.OptimizeMode;

            /** FileOptions go_package. */
            public go_package: string;

            /** FileOptions cc_generic_services. */
            public cc_generic_services: boolean;

            /** FileOptions java_generic_services. */
            public java_generic_services: boolean;

            /** FileOptions py_generic_services. */
            public py_generic_services: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions cc_enable_arenas. */
            public cc_enable_arenas: boolean;

            /** FileOptions objc_class_prefix. */
            public objc_class_prefix: string;

            /** FileOptions csharp_namespace. */
            public csharp_namespace: string;

            /** FileOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;

            /**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;

            /**
             * Verifies a FileOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @param message FileOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions message_set_wire_format */
            message_set_wire_format?: (boolean|null);

            /** MessageOptions no_standard_descriptor_accessor */
            no_standard_descriptor_accessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions map_entry */
            map_entry?: (boolean|null);

            /** MessageOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** MessageOptions .cosmos_proto.interface_type */
            ".cosmos_proto.interface_type"?: (string|null);

            /** MessageOptions .cosmos_proto.implements_interface */
            ".cosmos_proto.implements_interface"?: (string|null);

            /** MessageOptions .gogoproto.goproto_getters */
            ".gogoproto.goproto_getters"?: (boolean|null);

            /** MessageOptions .gogoproto.goproto_stringer */
            ".gogoproto.goproto_stringer"?: (boolean|null);

            /** MessageOptions .gogoproto.verbose_equal */
            ".gogoproto.verbose_equal"?: (boolean|null);

            /** MessageOptions .gogoproto.face */
            ".gogoproto.face"?: (boolean|null);

            /** MessageOptions .gogoproto.gostring */
            ".gogoproto.gostring"?: (boolean|null);

            /** MessageOptions .gogoproto.populate */
            ".gogoproto.populate"?: (boolean|null);

            /** MessageOptions .gogoproto.stringer */
            ".gogoproto.stringer"?: (boolean|null);

            /** MessageOptions .gogoproto.onlyone */
            ".gogoproto.onlyone"?: (boolean|null);

            /** MessageOptions .gogoproto.equal */
            ".gogoproto.equal"?: (boolean|null);

            /** MessageOptions .gogoproto.description */
            ".gogoproto.description"?: (boolean|null);

            /** MessageOptions .gogoproto.testgen */
            ".gogoproto.testgen"?: (boolean|null);

            /** MessageOptions .gogoproto.benchgen */
            ".gogoproto.benchgen"?: (boolean|null);

            /** MessageOptions .gogoproto.marshaler */
            ".gogoproto.marshaler"?: (boolean|null);

            /** MessageOptions .gogoproto.unmarshaler */
            ".gogoproto.unmarshaler"?: (boolean|null);

            /** MessageOptions .gogoproto.stable_marshaler */
            ".gogoproto.stable_marshaler"?: (boolean|null);

            /** MessageOptions .gogoproto.sizer */
            ".gogoproto.sizer"?: (boolean|null);

            /** MessageOptions .gogoproto.unsafe_marshaler */
            ".gogoproto.unsafe_marshaler"?: (boolean|null);

            /** MessageOptions .gogoproto.unsafe_unmarshaler */
            ".gogoproto.unsafe_unmarshaler"?: (boolean|null);

            /** MessageOptions .gogoproto.goproto_extensions_map */
            ".gogoproto.goproto_extensions_map"?: (boolean|null);

            /** MessageOptions .gogoproto.goproto_unrecognized */
            ".gogoproto.goproto_unrecognized"?: (boolean|null);

            /** MessageOptions .gogoproto.protosizer */
            ".gogoproto.protosizer"?: (boolean|null);

            /** MessageOptions .gogoproto.compare */
            ".gogoproto.compare"?: (boolean|null);

            /** MessageOptions .gogoproto.typedecl */
            ".gogoproto.typedecl"?: (boolean|null);

            /** MessageOptions .gogoproto.messagename */
            ".gogoproto.messagename"?: (boolean|null);

            /** MessageOptions .gogoproto.goproto_sizecache */
            ".gogoproto.goproto_sizecache"?: (boolean|null);

            /** MessageOptions .gogoproto.goproto_unkeyed */
            ".gogoproto.goproto_unkeyed"?: (boolean|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions message_set_wire_format. */
            public message_set_wire_format: boolean;

            /** MessageOptions no_standard_descriptor_accessor. */
            public no_standard_descriptor_accessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions map_entry. */
            public map_entry: boolean;

            /** MessageOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;

            /**
             * Verifies a MessageOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @param message MessageOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** FieldOptions .cosmos_proto.accepts_interface */
            ".cosmos_proto.accepts_interface"?: (string|null);

            /** FieldOptions .gogoproto.nullable */
            ".gogoproto.nullable"?: (boolean|null);

            /** FieldOptions .gogoproto.embed */
            ".gogoproto.embed"?: (boolean|null);

            /** FieldOptions .gogoproto.customtype */
            ".gogoproto.customtype"?: (string|null);

            /** FieldOptions .gogoproto.customname */
            ".gogoproto.customname"?: (string|null);

            /** FieldOptions .gogoproto.jsontag */
            ".gogoproto.jsontag"?: (string|null);

            /** FieldOptions .gogoproto.moretags */
            ".gogoproto.moretags"?: (string|null);

            /** FieldOptions .gogoproto.casttype */
            ".gogoproto.casttype"?: (string|null);

            /** FieldOptions .gogoproto.castkey */
            ".gogoproto.castkey"?: (string|null);

            /** FieldOptions .gogoproto.castvalue */
            ".gogoproto.castvalue"?: (string|null);

            /** FieldOptions .gogoproto.stdtime */
            ".gogoproto.stdtime"?: (boolean|null);

            /** FieldOptions .gogoproto.stdduration */
            ".gogoproto.stdduration"?: (boolean|null);

            /** FieldOptions .gogoproto.wktpointer */
            ".gogoproto.wktpointer"?: (boolean|null);

            /** FieldOptions .gogoproto.castrepeated */
            ".gogoproto.castrepeated"?: (string|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: google.protobuf.FieldOptions.CType;

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: google.protobuf.FieldOptions.JSType;

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;

            /**
             * Verifies a FieldOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @param message FieldOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            /** CType enum. */
            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            /** JSType enum. */
            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;

            /**
             * Verifies an OneofOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @param message OneofOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allow_alias */
            allow_alias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** EnumOptions .gogoproto.goproto_enum_prefix */
            ".gogoproto.goproto_enum_prefix"?: (boolean|null);

            /** EnumOptions .gogoproto.goproto_enum_stringer */
            ".gogoproto.goproto_enum_stringer"?: (boolean|null);

            /** EnumOptions .gogoproto.enum_stringer */
            ".gogoproto.enum_stringer"?: (boolean|null);

            /** EnumOptions .gogoproto.enum_customname */
            ".gogoproto.enum_customname"?: (string|null);

            /** EnumOptions .gogoproto.enumdecl */
            ".gogoproto.enumdecl"?: (boolean|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allow_alias. */
            public allow_alias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;

            /**
             * Verifies an EnumOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @param message EnumOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** EnumValueOptions .gogoproto.enumvalue_customname */
            ".gogoproto.enumvalue_customname"?: (string|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;

            /**
             * Verifies an EnumValueOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @param message EnumValueOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;

            /**
             * Verifies a ServiceOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @param message ServiceOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions uninterpreted_option */
            uninterpreted_option?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions uninterpreted_option. */
            public uninterpreted_option: google.protobuf.IUninterpretedOption[];

            /**
             * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;

            /**
             * Verifies a MethodOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @param message MethodOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifier_value */
            identifier_value?: (string|null);

            /** UninterpretedOption positive_int_value */
            positive_int_value?: (Long|null);

            /** UninterpretedOption negative_int_value */
            negative_int_value?: (Long|null);

            /** UninterpretedOption double_value */
            double_value?: (number|null);

            /** UninterpretedOption string_value */
            string_value?: (Uint8Array|null);

            /** UninterpretedOption aggregate_value */
            aggregate_value?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifier_value. */
            public identifier_value: string;

            /** UninterpretedOption positive_int_value. */
            public positive_int_value: Long;

            /** UninterpretedOption negative_int_value. */
            public negative_int_value: Long;

            /** UninterpretedOption double_value. */
            public double_value: number;

            /** UninterpretedOption string_value. */
            public string_value: Uint8Array;

            /** UninterpretedOption aggregate_value. */
            public aggregate_value: string;

            /**
             * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;

            /**
             * Verifies an UninterpretedOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UninterpretedOption
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @param message UninterpretedOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UninterpretedOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart name_part */
                name_part: string;

                /** NamePart is_extension */
                is_extension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart name_part. */
                public name_part: string;

                /** NamePart is_extension. */
                public is_extension: boolean;

                /**
                 * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Verifies a NamePart message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NamePart
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @param message NamePart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NamePart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];

            /**
             * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;

            /**
             * Verifies a SourceCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @param message SourceCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leading_comments */
                leading_comments?: (string|null);

                /** Location trailing_comments */
                trailing_comments?: (string|null);

                /** Location leading_detached_comments */
                leading_detached_comments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leading_comments. */
                public leading_comments: string;

                /** Location trailing_comments. */
                public trailing_comments: string;

                /** Location leading_detached_comments. */
                public leading_detached_comments: string[];

                /**
                 * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Verifies a Location message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

            /**
             * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;

            /**
             * Verifies a GeneratedCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeneratedCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @param message GeneratedCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation source_file */
                source_file?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation source_file. */
                public source_file: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;

                /**
                 * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Verifies an Annotation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Annotation
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @param message Annotation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Annotation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: Long;

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (Long|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: Long;

            /** Duration nanos. */
            public nanos: number;

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Duration;

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Duration;

            /**
             * Verifies a Duration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Duration
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Duration;

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @param message Duration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Duration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
