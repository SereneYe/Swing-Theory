import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../constants/theme';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import styles from './styles';

const RichTextEditor = ({ initialValue, editorRef, onChange }) => {
    return (
        <View style={{ minHeight: 285 }}>
            <RichToolbar
                actions={[
                    actions.setStrikethrough,
                    actions.removeFormat,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertOrderedList,
                    actions.blockquote,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.code,
                    actions.line,
                    actions.heading1,
                    actions.heading4,
                ]}
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>,
                    [actions.heading4]: ({ tintColor }) => <Text style={{ color: tintColor }}>H4</Text>,
                }}
                style={styles.richBar}
                flatContainerStyle={styles.flatStyle}
                editor={editorRef}
                selectedIconTint={theme.colors.primary}
                disabled={false}
            />
            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                editorStyle={styles.contentStyle}
                placeholder={"What's on your mind?"}
                onChange={onChange}
                editorInitializedCallback={() => {}}
            />
        </View>
    );
};

export default RichTextEditor;