import { Form, Row, Col, Select, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

export type OperationsFiltersValues = {
  name?: string;
  type?: 'Profit' | 'Cost';
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  sortBy?: 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc';
};

type Props = {
  onFilter: (filters: OperationsFiltersValues) => void;
};

export const OperationsFilters = ({ onFilter }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: OperationsFiltersValues) => {
    onFilter({
      name: values.name || undefined,
      type: values.type || undefined,
      dateRange: values.dateRange || undefined,
      sortBy: values.sortBy || 'date-desc',
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ sortBy: 'date-desc' }}
      style={{ marginBottom: 24 }}
    >
      <Row gutter={[16, 16]} style={{ background: '#fafafa', padding: '16px', borderRadius: 8 }}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="name" label="Поиск по названию">
            <Input placeholder="Название операции" allowClear />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="type" label="Тип операции">
            <Select placeholder="Любой" allowClear>
              <Option value="Profit">Доход</Option>
              <Option value="Cost">Расход</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="dateRange" label="Период">
            <RangePicker style={{ width: '100%' }} format="DD.MM.YYYY" placeholder={['С', 'По']} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="sortBy" label="Сортировка">
            <Select>
              <Option value="date-desc">📅 Новые первыми</Option>
              <Option value="date-asc">📅 Старые первыми</Option>
              <Option value="amount-desc">💰 Сумма: по убыванию</Option>
              <Option value="amount-asc">💰 Сумма: по возрастанию</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} style={{ textAlign: 'right' }}>
          <Search
            placeholder=""
            enterButton="Применить"
            onSearch={() => form.submit()}
            style={{ width: 'auto' }}
          />
        </Col>
      </Row>
    </Form>
  );
};
