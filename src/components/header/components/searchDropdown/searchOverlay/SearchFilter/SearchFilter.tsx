import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryComponents } from 'components/header/components/HeaderSearch/HeaderSearch';
import * as S from './SearchFilter.styles';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseRow } from 'components/common/BaseRow/BaseRow';

interface SearchFilterProps {
  data: CategoryComponents[] | null;
  isOpen: boolean;
  children: (filteredResults: CategoryComponents[]) => React.ReactNode;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  data,
  isOpen,
  children,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<any>([]);
  const [filteredResults, setFilteredResults] = useState<
    CategoryComponents[] | null
  >(data);

  const { t } = useTranslation();
  const categoriesList = [
    { name: 'all', title: 'All' },
    { name: 'components', title: 'Components' },
    { name: 'templates', title: 'Templates' },
    { name: 'pages', title: 'Pages' },
  ];
  const filterElements = useMemo(
    () =>
      categoriesList.map((filter, index) => (
        <BaseCol key={index} xs={12} sm={8} md={12} xl={8}>
          <S.CheckBox key={index} value={filter.name}>
            {t(filter.title)}
          </S.CheckBox>
        </BaseCol>
      )),
    [t],
  );

  useEffect(() => {
    if (data) {
      if (selectedFilter.length > 0) {
        setFilteredResults(
          data.filter(component =>
            selectedFilter.some((filter: any) => filter === component.category),
          ),
        );
      } else {
        setFilteredResults(data);
      }
    } else {
      setFilteredResults(null);
    }
  }, [data, selectedFilter]);

  return (
    <>
      <S.FilterWrapper isOpen={isOpen}>
        <S.CheckboxGroup
          onChange={checkedValues => setSelectedFilter(checkedValues)}
        >
          <BaseRow>{filterElements}</BaseRow>
        </S.CheckboxGroup>
      </S.FilterWrapper>

      {filteredResults && children(filteredResults)}
    </>
  );
};
