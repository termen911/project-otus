import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';
import { useProfileStore } from '@/entities/profile';
import { ChangePasswordForm } from '@/features/profile/change-password/ui/ChangePasswordForm';
import { ProfileEditForm } from '@/features/profile/edit/ui/ProfileEditForm';
import { MainLayout } from '@/widgets/main-layout';
import { Card, Divider, Flex, Typography } from 'antd';

const { Text } = Typography;

export const ProfilePage = () => {
  const { t } = useAppTranslation();
  const profile = useProfileStore((state) => state.profile);

  if (!profile) return <div>{t('pages.profile.notFound')}</div>;

  return (
    <MainLayout>
      <Card title={t('pages.profile.title')} variant="borderless" style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Flex vertical align="center" style={{ marginBottom: 24 }}>
            <Flex gap={16} justify="start">
              <Text strong>{t('pages.profile.info.name')}</Text>{' '}
              <Text>{profile.name ?? t('pages.profile.info.noName')}</Text>
            </Flex>
            <Flex gap={16}>
              <Text strong>{t('pages.profile.info.email')}</Text> <Text>{profile.email}</Text>
            </Flex>
            <Flex gap={16}>
              <Text strong>{t('pages.profile.info.signUpDate')}</Text>{' '}
              <Text>{new Date(profile.signUpDate).toLocaleDateString()}</Text>
            </Flex>
          </Flex>
          <Divider />
          <ProfileEditForm />
          <Divider />
          <Flex justify="center">
            <ChangePasswordForm />
          </Flex>
        </Flex>
      </Card>
    </MainLayout>
  );
};
