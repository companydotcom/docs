import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  SimpleGridProps,
  SimpleGrid
} from "@vastly/ui"
import NextLink from "next/link"

interface InfoCardProps {
  heading: string
  description: string
  link: string
  isExternal?: boolean
}

export const LinkCard = ({ heading, description, link, isExternal = false }: InfoCardProps) => {
  const bg = useColorModeValue("gray.50", "gray.600")

  return (
    <LinkBox as="article">
      <Card
        transitionDuration=".2s"
        transitionProperty="all"
        transitionTimingFunction="cubic-bezier(.4,0,.2,1)"
        _hover={{
          boxShadow: "md",
          bg
        }}
        height="full"
      >
        <CardHeader>
          <Heading size="md">
            <LinkOverlay as={isExternal ? undefined : NextLink} href={link} isExternal={isExternal}>
              {heading}
            </LinkOverlay>
          </Heading>
        </CardHeader>
        <CardBody pt="0">
          <Text fontSize="sm">{description}</Text>
        </CardBody>
      </Card>
    </LinkBox>
  )
}

export const LinkCards = ({ children, ...rest }: SimpleGridProps) => {
  return (
    <SimpleGrid columns={[1, 2]} gap="4" pt="6" {...rest}>
      {children}
    </SimpleGrid>
  )
}
