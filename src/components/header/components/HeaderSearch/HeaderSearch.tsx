import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SearchDropdown } from '../searchDropdown/SearchDropdown';
import { BaseButton } from 'components/common/BaseButton/BaseButton';
import {
  components as configComponents,
  Component,
} from 'constants/config/components';
import { useResponsive } from 'hooks/useResponsive';
import * as S from './HeaderSearch.styles';
export interface CategoryComponents {
  category: any;
  components: Component[];
}
export const HeaderSearch: React.FC = () => {
  const { mobileOnly, isTablet } = useResponsive();

  const { pathname } = useLocation();

  const [query, setQuery] = useState('');
  const [components] = useState<Component[]>(configComponents);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    setModalOpen(false);
    setOverlayOpen(false);
  }, [pathname]);

  return (
    <>
      {mobileOnly && (
        <>
          <BaseButton
            type={isModalOpen ? 'ghost' : 'text'}
            icon={<S.SearchIcon onClick={() => setModalOpen(true)} />}
          />
          <S.SearchModal
            open={isModalOpen}
            closable={false}
            footer={null}
            onCancel={() => setModalOpen(false)}
            destroyOnClose
          >
            <SearchDropdown
              query={query}
              setQuery={setQuery}
              data={[]}
              isOverlayOpen={isOverlayOpen}
              setOverlayOpen={setOverlayOpen}
            />
          </S.SearchModal>
        </>
      )}

      {isTablet && (
        <SearchDropdown
          query={query}
          setQuery={setQuery}
          data={[]}
          isOverlayOpen={isOverlayOpen}
          setOverlayOpen={setOverlayOpen}
        />
      )}
    </>
  );
};
