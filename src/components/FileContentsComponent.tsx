import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { Box } from "@primer/react";

export default function FileContents(props: any) {
    return (
        <Box p={4}>
            <Box
                borderColor="border.default"
                borderWidth={1}
                borderStyle="solid"
                borderRadius={6}
                overflow="hidden"
            >
                <Box
                    bg="canvas.subtle"
                    p={3}
                    borderBottomWidth={1}
                    borderBottomStyle="solid"
                    borderColor="border.default"
                >
                    File Contents {props.readonly === true ? "(Read Only)" : ""}
                </Box>

                <Box p={3}
                    className="file-editor-json-mc">
                    <JSONInput
                        viewOnly={props.readonly}
                        id='file-editor-json-mc'
                        theme="dark_vscode_tribute"
                        width="100%"
                        locale={locale}
                        placeholder={JSON.parse(props.contents)}
                        onChange={(data: any) => {
                            if (data.error === false) {
                                props.onChange(data.json)
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}