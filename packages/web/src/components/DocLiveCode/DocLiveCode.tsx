import React from "react";
import { createUrl } from "playroom/utils";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import {
	LiveProvider,
	LivePreview,
	LiveEditor,
	LiveError,
	withLive,
} from "react-live";
import * as ui from "@poodle/ui";
import * as icons from "@poodle/icons/react";
import styled from "@emotion/styled";

const Pre = styled.pre`
	text-align: left;
	margin: 1em 0;
	padding: 0.5em;
	overflow: auto;
`;

const Line = styled.div`
	display: table-row;
`;

const LineContent = styled.span`
	display: table-cell;
`;

export type DocLiveCodeProps = {
	className?: string;
	pre?: React.ReactElement<any>;
	fallback?: React.ReactElement<any>;
	match?: RegExp;
	children?: React.ReactNode | string;
};

const JSX_REG = /language\-\jsx-live/;

// function transformCode(code: string) {
// 	return `<React.Fragment>${code}</React.Fragment>`;
// }

type LiveErrorCustomProps = {
	live?: {
		error?: string;
	};
};

function LiveErrorCustom(props: LiveErrorCustomProps) {
	const { live } = props;

	if (!live?.error) {
		return null;
	}

	return (
		<ui.Box mt="scale-4" bgc="negative200" color="negativeTextOnBg" p="scale-4">
			<LiveError />
		</ui.Box>
	);
}

const WithLiveErrorCustom = withLive<LiveErrorCustomProps>(LiveErrorCustom);

function DocLiveCode(props: DocLiveCodeProps) {
	const { children, className = "" } = props;
	const isLive = JSX_REG.test(className);
	const [showCode, setShowCode] = React.useState(false);

	const scope = React.useMemo(
		() => ({
			...ui,
			...icons,
		}),
		[]
	);

	const language = isLive ? "jsx" : props.className?.split("language-")[1];

	const code = React.Children.toArray(children).join("\n").replace(/\s$/, "");

	function handleOpenPlayroom() {
		window.open(
			`/playroom/${
				code
					? createUrl({
							code,
					  })
					: ""
			}`,
			"_blank"
		);
	}

	if (!isLive) {
		return (
			<Highlight
				{...defaultProps}
				theme={dracula}
				code={code}
				language={language as any}
			>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<Pre className={className} style={style}>
						{tokens.map((line, i) => (
							<Line key={i} {...getLineProps({ line, key: i })}>
								<LineContent>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</LineContent>
							</Line>
						))}
					</Pre>
				)}
			</Highlight>
		);
	}

	return (
		<ui.Box>
			<LiveProvider
				language="jsx"
				code={code}
				scope={scope}
				//transformCode={transformCode}
				theme={dracula}
			>
				<ui.Box
					border="1px solid"
					borderColor="border"
					p="scale-4"
					borderRadius="4px"
				>
					<LivePreview />
				</ui.Box>
				{showCode && (
					<React.Fragment>
						<WithLiveErrorCustom />
						<ui.Box mt="scale-4" borderRadius="4px" position="relative">
							<ui.Box position="absolute" top="0" right="0">
								Editable
							</ui.Box>
							<LiveEditor />
						</ui.Box>
					</React.Fragment>
				)}
			</LiveProvider>

			<ui.Box display="flex" mt="scale-4" justifyContent="flex-end">
				<ui.Button
					sizeStyle="s"
					onClick={() => {
						setShowCode((v) => {
							return !v;
						});
					}}
				>
					{showCode ? "Hide code" : "Show code"}
				</ui.Button>
				<ui.Button ml="scale-2" sizeStyle="s" onClick={handleOpenPlayroom}>
					Open in playroom
				</ui.Button>
			</ui.Box>
		</ui.Box>
	);
}

export default DocLiveCode;
