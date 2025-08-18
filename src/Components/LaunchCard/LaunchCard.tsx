import { Card, Text, Image, Group, Button } from '@mantine/core';
import noImage from '../../assets/opanki.png';
import type { Launch } from '../../types';
import './LaunchCard.scss'


interface LaunchCardProps {
  launch: Launch;
  onSeeMore: (launch: Launch) => void;
}

export function LaunchCard ({ launch, onSeeMore }: LaunchCardProps) {
  const handleClick = () => {
    onSeeMore(launch);
  };
  return (
      <Card className="launch-card" shadow="sm" padding="md" radius="md" withBorder>
        <Group className="launch-card--group" style={{ justifyContent: 'space-between' }} mt="md" mb="xs">
          <Image
            className="launch-card--image"
            src={launch.links?.mission_patch_small || noImage}
            alt={launch.mission_name}
          />
          <Text className="launch-card--title">{launch.mission_name || 'No info'}</Text>
          <Text className="launch-card--rocket">{launch.rocket?.rocket_name || 'No info'}</Text>
        </Group>

        <Button className='launch-card--button' fullWidth onClick={handleClick}>
          See more
        </Button>
      </Card>
  );
}
