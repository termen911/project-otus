import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { useProfileStore } from '@/entities/profile';
import { ChangePasswordForm } from '@/features/profile/change-password';
import { ProfileEditNicknameForm } from '@/features/profile/edit-nickname';
import { MainLayout } from '@/widgets/main-layout';
import { Card, Divider, Flex, Typography } from 'antd';

const { Text } = Typography;

export const ProfilePage = () => {
  const { t, currentLang } = useAppTranslation('pages.profile');
  const profile = useProfileStore((state) => state.profile);

  if (!profile) return <div>{t('notFound')}</div>;

  return (
    <MainLayout>
      <Card title={t('title')} variant="borderless" style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Flex vertical align="center" style={{ marginBottom: 24 }}>
            <Flex gap={16} justify="start">
              <Text strong>{t('info.name')}</Text>{' '}
              <Text>{profile.name ?? t('info.noName')}</Text>
            </Flex>
            <Flex gap={16}>
              <Text strong>{t('info.email')}</Text> <Text>{profile.email}</Text>
            </Flex>
            <Flex gap={16}>
              <Text strong>{t('info.signUpDate')}</Text>{' '}
              <Text>{new Date(profile.signUpDate).toLocaleDateString(currentLang)}</Text>
            </Flex>
          </Flex>
          <Divider />
          <ProfileEditNicknameForm />
          <Divider />
          <Flex justify="center">
            <ChangePasswordForm />
          </Flex>
        </Flex>
      </Card>
    </MainLayout>
  );
};
