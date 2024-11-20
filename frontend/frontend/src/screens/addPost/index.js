import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    Alert,
 ScrollView,
} from "react-native";
import React, {useState, useCallback, useEffect, useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import {hp} from "../../constants/common";
import {theme} from "../../constants/theme";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import styles from './styles';
import {getUserInfo} from "../../services/user";
import Avatar from "../../components/avartar";
import RichTextEditor from "../../components/richTextEditor";
import {ArrowLeftIcon, CameraIcon, TrashIcon, VideoIcon} from "../../components/icons/icons";
import Button from "../../components/button";
import * as ImagePicker from "expo-image-picker";
import {Video} from "expo-av";
import {Image} from "expo-image";
import {createPost} from "../../services/addPost";

const NewPostScreen = () => {
    const bodyRef = useRef('');
    const editorRef = useRef(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(() => getUserInfo());

    useEffect(
        useCallback(() => {
            (async () => {
                const data = await getUserInfo();
                setUser(data);
            })();
        }, [])
    );

    const onPick = async (isImage) => {
        const mediaConfig = isImage
            ? {
                mediaTypes: ImagePicker.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
            } : {
                mediaTypes: ImagePicker.Videos,
                allowsEditing: true,
            };

        const result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

        if (!result.canceled) {
            setFile(result.assets[0]);
        }
    };


    const onSubmit = async () => {
        if (!bodyRef.current && !file) {
            Alert.alert('Post', 'Please choose an image or add post body!');
            return;
        }
        setLoading(true);
        try {
            const data = {
                file,
                body: bodyRef.current,
            };

            const success = await createPost(data);

            if (success) {
                setFile(null);
                bodyRef.current = '';
                editorRef.current?.setContentHTML('');
                navigation.navigate("profile");
            } else {
                Alert.alert('Post', 'Failed to create post!');
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            Alert.alert('Post', error.message || 'Failed to create post!');
        } finally {
            setLoading(false);
        }
    };

    const getFileType = (file) => {
        if (!file) return null;
        return file.type;
    };

    const getFileUri = (file) => {
        if (!file) return null;
        return file.uri;
    };

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <View style={styles.topHeader}>
                    <Pressable
                        onPress={() => navigation.navigate("Home")}
                        style={styles.backButton}
                    >
                        <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
                    </Pressable>

                <Pressable style={styles.titleContainer}>
                    <Text style={styles.title}>Create Post</Text>
                </Pressable>
                </View>
                <ScrollView contentContainerStyle={{gap: 20}}>
                    <View style={styles.header}>
                        <Avatar uri={user.image} size={hp(6.5)} rounded={theme.radius.xl}/>
                        <View style={{gap: 2}}>
                            <Text style={styles.username}>{user.name}</Text>
                            <Text style={styles.publicText}>Public</Text>
                        </View>
                    </View>
                    <View style={styles.textEditor}>
                        <RichTextEditor
                            editorRef={editorRef}
                            onChange={(body) => (bodyRef.current = body)}
                        />
                    </View>
                    {file && (
                        <View style={styles.file}>
                            {getFileType(file) === 'video' ? (
                                <Video
                                    style={{flex: 1}}
                                    source={{uri: getFileUri(file)}}
                                    useNativeControls
                                    resizeMode="cover"
                                    isLooping
                                />
                            ) : (
                                <Image source={{uri: getFileUri(file)}} contentFit="cover" style={{flex: 1}}/>
                            )}
                            <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                                <TrashIcon color="white" size={20}/>
                            </Pressable>
                        </View>
                    )}
                    <View style={styles.media}>
                        <Text style={styles.addImageText}>Add to your post</Text>
                        <View style={styles.mediaIcons}>
                            <TouchableOpacity onPress={() => onPick(true)}>
                                <CameraIcon name="image" size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPick(false)}>
                                <VideoIcon name="video" size={33}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Button
                    buttonStyle={{height: hp(6.2)}}
                    title={'Post'}
                    loading={loading}
                    hasShadow={false}
                    onPress={onSubmit}
                />
            </View>
        </ScreenWrapper>
    );
};

export default NewPostScreen;