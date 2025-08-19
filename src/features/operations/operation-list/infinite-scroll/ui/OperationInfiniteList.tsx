import { Alert, Col, Divider, Flex, Row, Spin, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteOperations } from '../model/useInfiniteOperations';
import { OperationCard } from '@/entities/operation/ui';
import { DeleteOperationModal } from '@/features/operations/operation-delete';
import type { Operation } from '@/entities/operation';
import { OperationEditModal } from '@/features/operations/operation-edit';
import { useAppTranslation } from '@/app/providers/i18n/useAppTranslation';

export const OperationInfiniteList = () => {
  const { t } = useAppTranslation('features.operations.operation-list.infinite-scroll');
  const [deleteOperationId, setDeleteOperationId] = useState<string | null>(null);
  const [editOperationId, setEditOperationId] = useState<Operation | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteOperations();

  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('alert.error')}
        description={(error as Error).message}
        type="error"
        showIcon
      />
    );
  }

  const operations = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Flex vertical>
      <Row align="stretch" gutter={[16, 16]}>
        {operations.length ? (
          operations.map((operation) => (
            <Col key={operation.id} xs={24} sm={12} md={8} lg={6}>
              <OperationCard operation={operation} onEdit={() => setEditOperationId(operation)} onDelete={() => setDeleteOperationId(operation.id)} />
            </Col>
          ))
        ) : (
          <Col xs={24}>
            <Alert message={t('alert.noOperations')} type="info" showIcon />
          </Col>
        )}
      </Row>

      {hasNextPage && (
        <div ref={loader} style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Divider>
            <Spin size="small" /> {t('divider.loading')}
          </Divider>
        </div>
      )}

      {!hasNextPage && operations.length > 0 && (
        <Divider dashed>
          <Typography.Text type="secondary">{t('divider.allOperations')}</Typography.Text>
        </Divider>
      )}
      {deleteOperationId ? (
        <DeleteOperationModal
          operationId={deleteOperationId}
          open={!!deleteOperationId}
          onCancel={() => setDeleteOperationId(null)}
        />
      ) : null}
      {editOperationId ? (
        <OperationEditModal
          operation={editOperationId}
          open={!!editOperationId}
          onCancel={() => setEditOperationId(null)}
        />
      ) : null}
    </Flex>
  );
};
