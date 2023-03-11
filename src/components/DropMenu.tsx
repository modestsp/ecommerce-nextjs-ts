import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import styles from '../styles/Shop.module.css';
import { useRouter } from 'next/router';
import { useShopStore } from '@/lib/store';

function DropMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const selectedCat = useShopStore((state) => state.selectedCat);
  const setSelectedCat = useShopStore((state) => state.setSelectedCat);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category: string) => {
    setAnchorEl(null);
    const currentCat = router.asPath.substring(
      router.asPath.lastIndexOf('/') + 1
    );
    if (typeof category !== 'string') {
      console.log('ENTRE');
      setSelectedCat(currentCat === 'shop' ? 'All products' : currentCat);
    } else if (category === 'All products') {
      setSelectedCat(`${category}`);
      router.push('/shop');
    } else {
      setSelectedCat(`${category}`);
      router.push(`/shop/${category}`);
    }
  };

  return (
    <div className={styles.categoriesMenu}>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedCat}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleClose('men')}>Men</MenuItem>
        <MenuItem onClick={() => handleClose('women')}>Women</MenuItem>
        <MenuItem onClick={() => handleClose('hats')}>Hats</MenuItem>
        <MenuItem onClick={() => handleClose('jewelry')}>Jewelry</MenuItem>
        <MenuItem onClick={() => handleClose('All products')}>
          All Products
        </MenuItem>
      </Menu>
    </div>
  );
}

export default DropMenu;
