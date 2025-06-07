import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SocioLoginSection.styled';

interface SocialLoginSectionProps {
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onFacebookPress,
  onGooglePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR CONTINUE WITH</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} onPress={onFacebookPress}>
          <Icon
            name="facebook-square"
            size={22}
            color="#1877F2"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
          <Icon name="google" size={20} color="#DB4437" style={styles.icon} />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialLoginSection;
